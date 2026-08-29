/**
 * Dt. Mehmet Yağcı — İnteraktif Görsel Odak Noktası (Kadraj) & WebP Sıkıştırma Aracı
 *
 * • Fotoğrafın hangi bölümünün görüneceğini (object-position) tıkla/sürükle ile ayarlar.
 * • Yüklenen fotoğrafı tarayıcıda küçültüp WebP'e çevirir; böylece site hızlı kalır.
 */
(function () {
  'use strict';

  var MAX_WIDTH = 1600;      // Yüklenen fotoğrafın en fazla genişliği
  var TARGET_QUALITY = 0.85; // WebP kalitesi

  function fmtSize(bytes) {
    if (!bytes) return '—';
    return bytes < 1024 * 1024
      ? Math.round(bytes / 1024) + ' KB'
      : (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function dataUrlBytes(dataUrl) {
    var idx = String(dataUrl).indexOf(',');
    if (idx === -1) return 0;
    return Math.floor((dataUrl.length - idx - 1) * 0.75);
  }

  // Fotoğrafı küçültüp WebP'e çevirir
  function compressImage(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error('Dosya okunamadı.')); };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error('Fotoğraf açılamadı.')); };
        img.onload = function () {
          try {
            var scale = Math.min(1, MAX_WIDTH / img.naturalWidth);
            var width = Math.round(img.naturalWidth * scale);
            var height = Math.round(img.naturalHeight * scale);

            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            var webp = canvas.toDataURL('image/webp', TARGET_QUALITY);
            var out = webp.indexOf('data:image/webp') === 0
              ? webp
              : canvas.toDataURL('image/jpeg', 0.85);

            resolve({
              url: out,
              width: width,
              height: height,
              originalBytes: file.size,
              bytes: dataUrlBytes(out)
            });
          } catch (err) {
            reject(err);
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  var VisualFocalCropper = {
    modalEl: null,
    options: null,
    x: 50,
    y: 50,
    url: '',
    meta: null,
    dragging: false,

    open: function (options) {
      this.build();
      this.options = options || {};
      this.url = this.options.imageUrl || '';
      this.x = isFinite(this.options.focalX) ? Number(this.options.focalX) : 50;
      this.y = isFinite(this.options.focalY) ? Number(this.options.focalY) : 50;
      this.meta = null;

      var title = document.getElementById('cropperModalTitle');
      if (title) title.textContent = this.options.title || 'Fotoğraf & Kadraj Odak Noktası';

      var frame = document.getElementById('cropperPreviewFrame');
      if (frame) frame.style.aspectRatio = this.options.aspectRatio || '16 / 10';

      var ratio = document.getElementById('cropperRatioLabel');
      if (ratio) ratio.textContent = this.options.ratioName || 'Klinik Kartı Görünümü';

      this.syncImage();
      this.syncVisuals();
      this.modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    close: function () {
      if (this.modalEl) this.modalEl.classList.remove('active');
      document.body.style.overflow = '';
    },

    build: function () {
      if (this.modalEl) return;

      var modal = document.createElement('div');
      modal.id = 'focalCropperModal';
      modal.className = 'cropper-modal-backdrop';
      modal.innerHTML = [
        '<div class="cropper-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="cropperModalTitle">',
        '  <div class="cropper-modal-header">',
        '    <div class="cropper-modal-title-wrap">',
        '      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>',
        '      <h3 id="cropperModalTitle" class="cropper-modal-title">Fotoğraf &amp; Kadraj Odak Noktası</h3>',
        '    </div>',
        '    <button type="button" class="cropper-btn-close" id="cropperBtnClose" aria-label="Kapat">&times;</button>',
        '  </div>',
        '  <div class="cropper-modal-body">',
        '    <div class="cropper-work-grid">',
        '      <div class="cropper-canvas-col">',
        '        <div class="cropper-instructions"><span class="step-num">1</span>',
        '          <span>Fotoğrafta öne çıkmasını istediğiniz noktaya <strong>tıklayın veya sürükleyin</strong>:</span>',
        '        </div>',
        '        <div class="cropper-canvas-container" id="cropperCanvasContainer" tabindex="0" role="application" aria-label="Odak noktası seçici">',
        '          <img src="" id="cropperSourceImg" class="cropper-source-img" alt="Kadraj kaynağı">',
        '          <div class="cropper-crosshair" id="cropperCrosshair">',
        '            <div class="crosshair-ring"></div>',
        '            <div class="crosshair-dot"></div>',
        '            <div class="crosshair-label" id="crosshairLabel">X: 50%, Y: 50%</div>',
        '          </div>',
        '        </div>',
        '        <div class="cropper-upload-bar">',
        '          <label class="cropper-upload-btn">',
        '            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
        '            <span>Yeni Fotoğraf Yükle</span>',
        '            <input type="file" id="cropperFileInput" accept="image/*" hidden>',
        '          </label>',
        '          <div class="cropper-url-input-wrap">',
        '            <input type="text" id="cropperUrlInput" class="cropper-input" placeholder="Dosya yolu veya görsel URL...">',
        '            <button type="button" id="cropperApplyUrlBtn" class="cropper-btn-secondary">Uygula</button>',
        '          </div>',
        '        </div>',
        '        <p class="cropper-file-meta" id="cropperFileMeta"></p>',
        '        <div class="cropper-presets-bar">',
        '          <span class="preset-label">Hızlı kadraj:</span>',
        '          <button type="button" class="cropper-preset-btn" data-x="50" data-y="15">⬆️ Üst / Yüz</button>',
        '          <button type="button" class="cropper-preset-btn" data-x="50" data-y="35">↗️ Üst Orta</button>',
        '          <button type="button" class="cropper-preset-btn" data-x="50" data-y="50">🎯 Tam Orta</button>',
        '          <button type="button" class="cropper-preset-btn" data-x="50" data-y="85">⬇️ Alt</button>',
        '        </div>',
        '      </div>',
        '      <div class="cropper-preview-col">',
        '        <div class="cropper-instructions"><span class="step-num">2</span><span>Sitedeki <strong>canlı görünüm</strong>:</span></div>',
        '        <div class="cropper-preview-card">',
        '          <div class="cropper-preview-frame" id="cropperPreviewFrame">',
        '            <img src="" id="cropperPreviewImg" class="cropper-preview-img" alt="Canlı önizleme">',
        '          </div>',
        '          <div class="cropper-preview-meta">',
        '            <span id="cropperRatioLabel" class="ratio-badge">Klinik Görünümü</span>',
        '            <span id="cropperCoordsDisplay" class="coords-badge">object-position: 50% 50%</span>',
        '          </div>',
        '        </div>',
        '        <div class="cropper-tip-box">',
        '          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
        '          <p>Yüklediğiniz fotoğraflar otomatik olarak optimize edilip WebP biçimine dönüştürülür; sitede açılış hızı asla düşmez.</p>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '  <div class="cropper-modal-footer">',
        '    <button type="button" class="btn-admin-secondary" id="cropperBtnCancel">İptal</button>',
        '    <button type="button" class="btn-admin-primary" id="cropperBtnSave">',
        '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        '      Kadrajı Kaydet ve Uygula',
        '    </button>',
        '  </div>',
        '</div>'
      ].join('\n');

      document.body.appendChild(modal);
      this.modalEl = modal;
      this.bind();
    },

    bind: function () {
      var self = this;
      var container = document.getElementById('cropperCanvasContainer');

      document.getElementById('cropperBtnClose').onclick = function () { self.close(); };
      document.getElementById('cropperBtnCancel').onclick = function () { self.close(); };
      this.modalEl.addEventListener('click', function (e) {
        if (e.target === self.modalEl) self.close();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && self.modalEl.classList.contains('active')) self.close();
      });

      document.getElementById('cropperBtnSave').onclick = function () {
        if (self.options && typeof self.options.onSave === 'function') {
          var posX = Math.round(self.x);
          var posY = Math.round(self.y);
          var alignStr = posY < 33 ? 'object-top' : (posY > 66 ? 'object-bottom' : 'object-center');

          self.options.onSave({
            url: self.url,
            focalX: posX,
            focalY: posY,
            focalPosition: posX + '% ' + posY + '%',
            imageAlign: alignStr,
            meta: self.meta
          });
        }
        self.close();
      };

      function fromPointer(e) {
        var rect = container.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        self.x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        self.y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        self.syncVisuals();
      }

      container.addEventListener('pointerdown', function (e) {
        self.dragging = true;
        container.focus();
        try { container.setPointerCapture(e.pointerId); } catch (err) { /* yoksay */ }
        fromPointer(e);
      });
      container.addEventListener('pointermove', function (e) {
        if (self.dragging) fromPointer(e);
      });
      function stop(e) {
        if (!self.dragging) return;
        self.dragging = false;
        try { container.releasePointerCapture(e.pointerId); } catch (err) { /* yoksay */ }
      }
      container.addEventListener('pointerup', stop);
      container.addEventListener('pointercancel', stop);

      container.addEventListener('keydown', function (e) {
        var step = e.shiftKey ? 10 : 2;
        var handled = true;
        if (e.key === 'ArrowLeft') self.x = Math.max(0, self.x - step);
        else if (e.key === 'ArrowRight') self.x = Math.min(100, self.x + step);
        else if (e.key === 'ArrowUp') self.y = Math.max(0, self.y - step);
        else if (e.key === 'ArrowDown') self.y = Math.min(100, self.y + step);
        else handled = false;
        if (handled) { e.preventDefault(); self.syncVisuals(); }
      });

      Array.prototype.forEach.call(this.modalEl.querySelectorAll('.cropper-preset-btn'), function (btn) {
        btn.addEventListener('click', function () {
          self.x = Number(btn.getAttribute('data-x'));
          self.y = Number(btn.getAttribute('data-y'));
          self.syncVisuals();
        });
      });

      var fileInput = document.getElementById('cropperFileInput');
      fileInput.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        compressImage(file).then(function (result) {
          self.url = result.url;
          self.meta = result;
          self.syncImage();
          self.syncVisuals();
        }).catch(function (err) {
          alert('Fotoğraf yüklenemedi: ' + err.message);
        });
      });

      document.getElementById('cropperApplyUrlBtn').onclick = function () {
        var val = (document.getElementById('cropperUrlInput').value || '').trim();
        if (val) {
          self.url = val;
          self.meta = null;
          self.syncImage();
          self.syncVisuals();
        }
      };
    },

    syncImage: function () {
      var src = this.url || '';
      var clean = src.startsWith('/') ? src : (src.indexOf('data:') === 0 || src.indexOf('http') === 0 ? src : '/' + src);
      var source = document.getElementById('cropperSourceImg');
      var preview = document.getElementById('cropperPreviewImg');
      var input = document.getElementById('cropperUrlInput');
      if (source) source.src = clean;
      if (preview) preview.src = clean;
      if (input) input.value = src.indexOf('data:') === 0 ? '(Yeni optimize edilmiş WebP fotoğrafı)' : src;

      var metaEl = document.getElementById('cropperFileMeta');
      if (metaEl) {
        if (this.meta) {
          metaEl.textContent = 'Boyut: ' + this.meta.width + '×' + this.meta.height + ' px | Optimize Edilen: ' + fmtSize(this.meta.bytes);
        } else {
          metaEl.textContent = '';
        }
      }
    },

    syncVisuals: function () {
      var cross = document.getElementById('cropperCrosshair');
      var label = document.getElementById('crosshairLabel');
      var preview = document.getElementById('cropperPreviewImg');
      var coords = document.getElementById('cropperCoordsDisplay');

      var px = Math.round(this.x);
      var py = Math.round(this.y);

      if (cross) {
        cross.style.left = this.x + '%';
        cross.style.top = this.y + '%';
      }
      if (label) label.textContent = 'X: ' + px + '%, Y: ' + py + '%';
      if (preview) preview.style.objectPosition = this.x + '% ' + this.y + '%';
      if (coords) coords.textContent = 'object-position: ' + px + '% ' + py + '%';
    }
  };

  window.DTCropper = {
    compressImage: compressImage,
    fmtSize: fmtSize,
    dataUrlBytes: dataUrlBytes,
    open: function (options) {
      VisualFocalCropper.open(options);
    }
  };
})();
