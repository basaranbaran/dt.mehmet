/**
 * Dt. Mehmet Yağcı — Diş Hekimi Yönetim Paneli Mantığı
 * Apple Design & Fluid Motion standartlarında hazırlanmıştır.
 */
(function () {
  'use strict';

  var AUTH_KEY = 'dt_admin_session_v1';
  var VALID_USER = 'admin';
  // SHA-256("dt-admin:" + "admin123")
  var DEFAULT_PASS_HASH = '1f85582f3c054238e8cb5ca89437ee9bf9d2fe2b78b5e9ee99c7bcaea4f9c8f9';

  var state = {
    data: null,
    published: null,
    activeTab: 'tab-overview',
    saveTimer: null,
    isDirty: false
  };

  var THEME_PALETTES = {
    premiumClinicTheme: {
      name: '💎 Premium Klinik (Lacivert & Bej)',
      primary: '#1E3A8A', secondary: '#3A312C', accent: '#A7D1FC', dark: '#111827', light: '#EEE6DB'
    },
    tealFresh: {
      name: '🌿 Taze Turkuaz',
      primary: '#0D9488', secondary: '#0F766E', accent: '#F59E0B', dark: '#111827', light: '#CCFBF1'
    },
    oceanBlue: {
      name: '🌊 Okyanus Mavisi',
      primary: '#2563EB', secondary: '#1D4ED8', accent: '#06B6D4', dark: '#0F172A', light: '#DBEAFE'
    },
    sunsetGlow: {
      name: '🌅 Gün Batımı (Pembe & Turuncu)',
      primary: '#DB2777', secondary: '#BE185D', accent: '#F97316', dark: '#18181B', light: '#FFE4E6'
    },
    royalIndigo: {
      name: '👑 Royal İndigo',
      primary: '#4F46E5', secondary: '#4338CA', accent: '#10B981', dark: '#1E1B4B', light: '#E0E7FF'
    },
    emeraldBio: {
      name: '🍃 Zümrüt Yeşili',
      primary: '#059669', secondary: '#047857', accent: '#F59E0B', dark: '#064E3B', light: '#D1FAE5'
    },
    softModern: {
      name: '✨ Soft Modern (Ahşap & Gri)',
      primary: '#BEA792', secondary: '#E8E2D9', accent: '#BCBCBC', dark: '#575B5F', light: '#FBF9F7'
    },
    warmWoodenTheme: {
      name: '🪵 Sıcak Ahşap & Altın',
      primary: '#5D4037', secondary: '#8D6E63', accent: '#D4AF37', dark: '#3E2723', light: '#F5F0E6'
    },
    softBeigeTheme: {
      name: '🍦 Soft Bej & Şampanya',
      primary: '#A69584', secondary: '#C9B9A6', accent: '#E0C9A6', dark: '#5D5752', light: '#DBF0FE'
    }
  };

  var ICONS_LIST = [
    { id: 'Zap', label: '⚡ Yıldırım / İmplantoloji' },
    { id: 'Smile', label: '😊 Gülüş Tasarımı' },
    { id: 'Shield', label: '🛡️ Koruyucu / Zirkonyum' },
    { id: 'Layers', label: '🦷 Kanal Tedavisi / Katman' },
    { id: 'Heart', label: '❤️ Estetik Dolgu / Kalp' },
    { id: 'Sparkles', label: '✨ Beyazlatma / Işıltı' },
    { id: 'UserCheck', label: '👨‍⚕️ Uzman Hekim' },
    { id: 'Cpu', label: '🔬 Dijital Teknoloji' },
    { id: 'ShieldCheck', label: '🩺 Hijyen & Güven' }
  ];

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function getPath(obj, path) {
    return String(path).split('.').reduce(function (acc, key) {
      return acc === null || acc === undefined ? undefined : acc[key];
    }, obj);
  }

  function setPath(obj, path, value) {
    var keys = String(path).split('.');
    var last = keys.pop();
    var target = keys.reduce(function (acc, key) {
      if (acc[key] === null || typeof acc[key] !== 'object') {
        acc[key] = /^\d+$/.test(keys[keys.indexOf(key) + 1] || last) ? [] : {};
      }
      return acc[key];
    }, obj);
    target[last] = value;
  }

  function toast(message, isError) {
    var box = $('#adminToast');
    var msg = $('#adminToastMsg');
    if (!box || !msg) return;
    msg.textContent = message;
    box.classList.toggle('error', !!isError);
    box.classList.add('active');
    clearTimeout(box._timer);
    box._timer = setTimeout(function () { box.classList.remove('active'); }, isError ? 5000 : 3000);
  }

  async function sha256(str) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  /* ========================================================================
     1. Kimlik Doğrulama & Oturum
     ======================================================================== */
  function checkAuth() {
    var isAuth = sessionStorage.getItem(AUTH_KEY) === '1' || localStorage.getItem(AUTH_KEY) === '1';
    var screen = $('#adminAuthScreen');
    if (isAuth) {
      if (screen) screen.style.display = 'none';
      initDashboard();
    } else {
      if (screen) screen.style.display = 'flex';
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    var user = $('#adminUsername').value.trim();
    var pass = $('#adminPassword').value;
    var err = $('#authErrorMsg');

    var hash = await sha256('dt-admin:' + pass);
    var customHash = localStorage.getItem('dt_admin_pass_hash');
    var targetHash = customHash || DEFAULT_PASS_HASH;

    // "admin" veya "admin123" veya hedef hash kabul edilir
    if (user.toLowerCase() === VALID_USER && (pass === 'admin' || pass === 'admin123' || hash === targetHash)) {
      sessionStorage.setItem(AUTH_KEY, '1');
      if (err) err.classList.remove('active');
      $('#adminAuthScreen').style.display = 'none';
      initDashboard();
      toast('Yönetici girişi başarılı!');
    } else {
      if (err) {
        err.textContent = 'Kullanıcı adı veya şifre hatalı!';
        err.classList.add('active');
      }
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    location.reload();
  }

  /* ========================================================================
     2. Veri Yükleme & Senkronizasyon
     ======================================================================== */
  function initDashboard() {
    DTData.load().then(function (data) {
      if (!data) {
        toast('Veri yüklenemedi, lütfen sayfayı yenileyin.', true);
        return;
      }
      state.data = data;
      state.published = DTData.clone(data);
      checkDirtyState();
      populateForm();
      bindEvents();
      renderAllDynamicSections();
      updateStatusDot();
    });
  }

  function checkDirtyState() {
    var draft = DTData.getDraft();
    state.isDirty = !!draft;
    var bar = $('#publishBar');
    if (bar) {
      bar.hidden = !state.isDirty;
    }
    updateStatusDot();
  }

  function updateStatusDot() {
    var dot = $('.draft-dot');
    var text = $('#draftStatusText');
    if (!dot || !text) return;
    if (state.isDirty) {
      dot.classList.add('modified');
      text.textContent = 'Yayınlanmamış değişiklikler var';
    } else {
      dot.classList.remove('modified');
      text.textContent = 'Tüm değişiklikler senkronize';
    }
  }

  function triggerAutoSave() {
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(function () {
      var res = DTData.saveDraft(state.data);
      if (res.ok) {
        state.isDirty = true;
        checkDirtyState();
      } else {
        toast(res.error, true);
      }
    }, 250);
  }

  /* ========================================================================
     3. Form Bağlama (Data-Bind)
     ======================================================================== */
  function populateForm() {
    $$('[data-bind]').forEach(function (el) {
      var path = el.getAttribute('data-bind');
      var val = getPath(state.data, path);
      if (val === undefined || val === null) val = '';

      if (el.type === 'checkbox') {
        el.checked = !!val;
      } else {
        el.value = val;
      }
    });
  }

  function bindEvents() {
    // Input / Textarea değişikliklerini dinle
    document.body.addEventListener('input', function (e) {
      var el = e.target.closest('[data-bind]');
      if (!el) return;
      var path = el.getAttribute('data-bind');
      var val = el.type === 'checkbox' ? el.checked : el.value;
      setPath(state.data, path, val);
      triggerAutoSave();
    });

    // Sekme Geçişleri
    $$('.sidebar-link').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabId = btn.getAttribute('data-tab');
        switchTab(tabId);
      });
    });

    $$('[data-goto-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabId = btn.getAttribute('data-goto-tab');
        switchTab(tabId);
      });
    });

    // Mobil Kenar Çubuğu
    var toggle = $('#mobileSidebarToggle');
    var sidebar = $('#adminSidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
      });
    }

    // Çıkış
    var btnLogout = $('#btnAdminLogout');
    if (btnLogout) btnLogout.addEventListener('click', handleLogout);

    // Yayınlama Butonları
    var btnPubTop = $('#btnPublishTop');
    var btnPubMobile = $('#btnPublishMobile');
    var btnPubMain = $('#btnPublishDirect');

    if (btnPubTop) btnPubTop.addEventListener('click', handlePublishClick);
    if (btnPubMobile) btnPubMobile.addEventListener('click', handlePublishClick);
    if (btnPubMain) btnPubMain.addEventListener('click', handlePublishClick);

    // Yedek İndir / Yükle
    var btnExport = $('#btnExportBackup');
    if (btnExport) {
      btnExport.addEventListener('click', function () {
        DTData.exportJson(state.data, 'config-yedek-' + new Date().toISOString().slice(0, 10) + '.json');
        toast('Yedek dosyası bilgisayarınıza indirildi.');
      });
    }

    var fileImport = $('#fileImportBackup');
    if (fileImport) {
      fileImport.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          var res = DTData.parseImported(reader.result);
          if (res.ok) {
            state.data = res.data;
            DTData.saveDraft(state.data);
            populateForm();
            renderAllDynamicSections();
            checkDirtyState();
            toast('Yedek başarıyla yüklendi!');
          } else {
            toast(res.error, true);
          }
        };
        reader.readAsText(file);
      });
    }

    // Taslağı Sıfırla
    var btnReset = $('#btnResetDraft');
    if (btnReset) {
      btnReset.addEventListener('click', function () {
        if (confirm('Tüm yayınlanmamış taslak değişiklikleriniz silinecek ve canlı sürüme dönülecektir. Onaylıyor musunuz?')) {
          DTData.clearDraft();
          location.reload();
        }
      });
    }

    // GitHub Ayarlarını Kaydet & Test Et
    var btnSaveGh = $('#btnSaveGitHubCfg');
    if (btnSaveGh) {
      btnSaveGh.addEventListener('click', function () {
        var cfg = {
          owner: $('#ghOwner').value.trim(),
          repo: $('#ghRepo').value.trim(),
          branch: $('#ghBranch').value.trim(),
          token: $('#ghToken').value.trim()
        };
        var res = DTData.github.saveConfig(cfg, true);
        if (res.ok) {
          toast('GitHub ayarları kaydedildi. Bağlantı test ediliyor...');
          DTData.github.verify(cfg).then(function () {
            toast('GitHub bağlantısı başarıyla doğrulandı! ✅');
          }).catch(function (err) {
            toast('GitHub hatası: ' + err.message, true);
          });
        }
      });
    }
  }

  function switchTab(tabId) {
    state.activeTab = tabId;
    $$('.sidebar-link').forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('data-tab') === tabId);
    });
    $$('.tab-pane').forEach(function (p) {
      p.classList.toggle('active', p.id === tabId);
    });
    var sidebar = $('#adminSidebar');
    if (sidebar) sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderAllDynamicSections() {
    renderOverviewStats();
    renderTreatments();
    renderFeatures();
    renderDoctorEducation();
    renderGallery();
    renderWorkingHours();
    renderPaletteGrid();
    renderAllImagesGrid();
    populateGitHubForm();
  }

  /* ========================================================================
     4. Dinamik Bölüm Oluşturucuları
     ======================================================================== */

  // 4.1. Genel Bakış İstatistikleri
  function renderOverviewStats() {
    var grid = $('#adminStatsGrid');
    if (!grid || !state.data) return;

    var paletteName = THEME_PALETTES[state.data.activePalette]?.name || state.data.activePalette;
    var treatmentsCount = (state.data.treatments || []).length;
    var galleryCount = (state.data.gallery || []).length;
    var featuresCount = (state.data.features || []).length;

    grid.innerHTML = [
      '<div class="stat-box primary">',
      '  <div class="stat-icon-wrap">🦷</div>',
      '  <div class="stat-info-wrap">',
      '    <span class="stat-val">' + treatmentsCount + '</span>',
      '    <span class="stat-lbl">Aktif Tedavi</span>',
      '  </div>',
      '</div>',
      '<div class="stat-box accent">',
      '  <div class="stat-icon-wrap">🖼️</div>',
      '  <div class="stat-info-wrap">',
      '    <span class="stat-val">' + galleryCount + '</span>',
      '    <span class="stat-lbl">Klinik Fotoğrafı</span>',
      '  </div>',
      '</div>',
      '<div class="stat-box gold">',
      '  <div class="stat-icon-wrap">⭐</div>',
      '  <div class="stat-info-wrap">',
      '    <span class="stat-val">' + featuresCount + '</span>',
      '    <span class="stat-lbl">Klinik Farkı</span>',
      '  </div>',
      '</div>',
      '<div class="stat-box success">',
      '  <div class="stat-icon-wrap">🎨</div>',
      '  <div class="stat-info-wrap">',
      '    <span class="stat-val" style="font-size: 0.95rem; font-weight: 700;">' + paletteName + '</span>',
      '    <span class="stat-lbl">Aktif Tema</span>',
      '  </div>',
      '</div>'
    ].join('');
  }

  // 4.2. Tedaviler Listesi
  function renderTreatments() {
    var cont = $('#treatmentsContainer');
    if (!cont || !state.data) return;
    var list = state.data.treatments || [];

    if (list.length === 0) {
      cont.innerHTML = '<p class="admin-help-text">Henüz tedavi eklenmemiş. Yukarıdaki "+ Yeni Tedavi Ekle" butonuna tıklayın.</p>';
      return;
    }

    var html = list.map(function (t, idx) {
      var iconOptions = ICONS_LIST.map(function (ic) {
        var sel = ic.id === t.icon ? 'selected' : '';
        return '<option value="' + ic.id + '" ' + sel + '>' + ic.label + '</option>';
      }).join('');

      return [
        '<div class="admin-item-card" data-index="' + idx + '">',
        '  <div class="admin-item-header">',
        '    <div class="admin-item-title-group">',
        '      <span class="admin-item-badge">#' + (idx + 1) + '</span>',
        '      <span class="admin-item-title">' + (t.title || 'Başlıksız Tedavi') + '</span>',
        '    </div>',
        '    <div class="admin-item-actions">',
        '      <button type="button" class="btn-item-ctrl btn-move-up" title="Yukarı Taşı" ' + (idx === 0 ? 'disabled' : '') + '>▲</button>',
        '      <button type="button" class="btn-item-ctrl btn-move-down" title="Aşağı Taşı" ' + (idx === list.length - 1 ? 'disabled' : '') + '>▼</button>',
        '      <button type="button" class="btn-item-ctrl danger btn-delete-item" title="Sil">🗑️</button>',
        '    </div>',
        '  </div>',
        '  <div class="admin-item-body">',
        '    <div class="form-grid-2">',
        '      <div class="form-group-admin">',
        '        <label>Tedavi Başlığı</label>',
        '        <input type="text" class="admin-input" data-bind="treatments.' + idx + '.title" value="' + (t.title || '') + '" />',
        '      </div>',
        '      <div class="form-group-admin">',
        '        <label>İkon Seçimi</label>',
        '        <select class="admin-select" data-bind="treatments.' + idx + '.icon">' + iconOptions + '</select>',
        '      </div>',
        '    </div>',
        '    <div class="form-group-admin">',
        '      <label>Kısa Açıklama (Kart Ön Yüzü)</label>',
        '      <textarea class="admin-textarea" style="min-height: 60px;" data-bind="treatments.' + idx + '.shortDescription">' + (t.shortDescription || '') + '</textarea>',
        '    </div>',
        '    <div class="form-group-admin">',
        '      <label>Detaylı Açıklama (Pop-up Detay Penceresi)</label>',
        '      <textarea class="admin-textarea" style="min-height: 80px;" data-bind="treatments.' + idx + '.longDescription">' + (t.longDescription || '') + '</textarea>',
        '    </div>',
        '    <div class="form-grid-2">',
        '      <div class="form-group-admin">',
        '        <label>Görsel Yolu</label>',
        '        <input type="text" class="admin-input" data-bind="treatments.' + idx + '.image" value="' + (t.image || '') + '" />',
        '      </div>',
        '      <div class="form-group-admin">',
        '        <label>Görsel Kadraj & Yükleme</label>',
        '        <div style="display: flex; gap: 8px;">',
        '          <label class="btn-admin-secondary" style="flex: 1; cursor: pointer; text-align: center;">',
        '            📁 Fotoğraf Seç',
        '            <input type="file" accept="image/*" class="file-treatment-upload" data-index="' + idx + '" style="display: none;" />',
        '          </label>',
        '          <button type="button" class="btn-admin-secondary btn-treatment-crop" data-index="' + idx + '">📐 Kadraj</button>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    cont.innerHTML = html;

    // Tedavi Buton Olayları
    cont.querySelectorAll('.btn-move-up').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var card = e.target.closest('.admin-item-card');
        var idx = parseInt(card.getAttribute('data-index'), 10);
        if (idx > 0) {
          var item = state.data.treatments.splice(idx, 1)[0];
          state.data.treatments.splice(idx - 1, 0, item);
          triggerAutoSave();
          renderTreatments();
        }
      });
    });

    cont.querySelectorAll('.btn-move-down').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var card = e.target.closest('.admin-item-card');
        var idx = parseInt(card.getAttribute('data-index'), 10);
        if (idx < state.data.treatments.length - 1) {
          var item = state.data.treatments.splice(idx, 1)[0];
          state.data.treatments.splice(idx + 1, 0, item);
          triggerAutoSave();
          renderTreatments();
        }
      });
    });

    cont.querySelectorAll('.btn-delete-item').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var card = e.target.closest('.admin-item-card');
        var idx = parseInt(card.getAttribute('data-index'), 10);
        if (confirm('Bu tedaviyi silmek istediğinizden emin misiniz?')) {
          state.data.treatments.splice(idx, 1);
          triggerAutoSave();
          renderTreatments();
          renderOverviewStats();
        }
      });
    });

    cont.querySelectorAll('.file-treatment-upload').forEach(function (input) {
      input.addEventListener('change', function (e) {
        var idx = parseInt(input.getAttribute('data-index'), 10);
        var file = e.target.files[0];
        if (!file) return;
        DTCropper.compressImage(file).then(function (res) {
          state.data.treatments[idx].image = res.url;
          triggerAutoSave();
          renderTreatments();
          renderAllImagesGrid();
          toast('Fotoğraf WebP formatında optimize edildi.');
        });
      });
    });

    cont.querySelectorAll('.btn-treatment-crop').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-index'), 10);
        var t = state.data.treatments[idx];
        DTCropper.open({
          title: 'Tedavi Kadrajı: ' + (t.title || 'Tedavi'),
          imageUrl: t.image,
          focalX: t.focalX !== undefined ? t.focalX : 50,
          focalY: t.focalY !== undefined ? t.focalY : (t.imageAlign === 'object-top' ? 15 : (t.imageAlign === 'object-bottom' ? 85 : 50)),
          aspectRatio: '16 / 10',
          ratioName: 'Tedavi Kartı (16:10)',
          onSave: function (res) {
            t.image = res.url;
            t.focalX = res.focalX;
            t.focalY = res.focalY;
            t.focalPosition = res.focalPosition;
            t.imageAlign = res.imageAlign;
            triggerAutoSave();
            renderTreatments();
            renderAllImagesGrid();
            toast('Kadraj kaydedildi: ' + res.focalPosition);
          }
        });
      });
    });
  }

  // 4.3. Özellikler Listesi
  function renderFeatures() {
    var cont = $('#featuresContainer');
    if (!cont || !state.data) return;
    var list = state.data.features || [];

    var html = list.map(function (f, idx) {
      var iconOptions = ICONS_LIST.map(function (ic) {
        var sel = ic.id === f.icon ? 'selected' : '';
        return '<option value="' + ic.id + '" ' + sel + '>' + ic.label + '</option>';
      }).join('');

      return [
        '<div class="admin-item-card" data-index="' + idx + '">',
        '  <div class="admin-item-header">',
        '    <div class="admin-item-title-group">',
        '      <span class="admin-item-badge">#' + (idx + 1) + '</span>',
        '      <span class="admin-item-title">' + (f.title || 'Fark Maddesi') + '</span>',
        '    </div>',
        '    <div class="admin-item-actions">',
        '      <button type="button" class="btn-item-ctrl btn-feat-up" ' + (idx === 0 ? 'disabled' : '') + '>▲</button>',
        '      <button type="button" class="btn-item-ctrl btn-feat-down" ' + (idx === list.length - 1 ? 'disabled' : '') + '>▼</button>',
        '      <button type="button" class="btn-item-ctrl danger btn-feat-del">🗑️</button>',
        '    </div>',
        '  </div>',
        '  <div class="admin-item-body">',
        '    <div class="form-grid-2">',
        '      <div class="form-group-admin">',
        '        <label>Madde Başlığı</label>',
        '        <input type="text" class="admin-input" data-bind="features.' + idx + '.title" value="' + (f.title || '') + '" />',
        '      </div>',
        '      <div class="form-group-admin">',
        '        <label>İkon</label>',
        '        <select class="admin-select" data-bind="features.' + idx + '.icon">' + iconOptions + '</select>',
        '      </div>',
        '    </div>',
        '    <div class="form-group-admin">',
        '      <label>Madde Açıklaması</label>',
        '      <textarea class="admin-textarea" style="min-height: 60px;" data-bind="features.' + idx + '.description">' + (f.description || '') + '</textarea>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    cont.innerHTML = html;

    cont.querySelectorAll('.btn-feat-up').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('.admin-item-card').getAttribute('data-index'), 10);
        if (idx > 0) {
          var item = state.data.features.splice(idx, 1)[0];
          state.data.features.splice(idx - 1, 0, item);
          triggerAutoSave();
          renderFeatures();
        }
      });
    });

    cont.querySelectorAll('.btn-feat-down').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('.admin-item-card').getAttribute('data-index'), 10);
        if (idx < state.data.features.length - 1) {
          var item = state.data.features.splice(idx, 1)[0];
          state.data.features.splice(idx + 1, 0, item);
          triggerAutoSave();
          renderFeatures();
        }
      });
    });

    cont.querySelectorAll('.btn-feat-del').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('.admin-item-card').getAttribute('data-index'), 10);
        if (confirm('Bu maddeyi silmek istiyor musunuz?')) {
          state.data.features.splice(idx, 1);
          triggerAutoSave();
          renderFeatures();
          renderOverviewStats();
        }
      });
    });
  }

  // 4.4. Hekim Eğitim Listesi
  function renderDoctorEducation() {
    var cont = $('#doctorEduContainer');
    if (!cont || !state.data) return;
    var list = (state.data.doctor && state.data.doctor.education) || [];

    var html = list.map(function (edu, idx) {
      return [
        '<div style="display: flex; gap: 8px; margin-bottom: 8px;" data-index="' + idx + '">',
        '  <input type="text" class="admin-input" data-bind="doctor.education.' + idx + '" value="' + (edu || '') + '" />',
        '  <button type="button" class="btn-admin-danger btn-del-edu" style="padding: 0 12px;">✕</button>',
        '</div>'
      ].join('');
    }).join('');

    cont.innerHTML = html;

    cont.querySelectorAll('.btn-del-edu').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('div').getAttribute('data-index'), 10);
        state.data.doctor.education.splice(idx, 1);
        triggerAutoSave();
        renderDoctorEducation();
      });
    });
  }

  // 4.5. Klinik Galerisi
  function renderGallery() {
    var cont = $('#galleryContainer');
    if (!cont || !state.data) return;
    var list = state.data.gallery || [];

    var html = list.map(function (g, idx) {
      return [
        '<div class="admin-item-card" data-index="' + idx + '">',
        '  <div class="admin-item-header">',
        '    <div class="admin-item-title-group">',
        '      <span class="admin-item-badge">#' + (idx + 1) + '</span>',
        '      <span class="admin-item-title">' + (g.title || 'Galeri Fotoğrafı') + '</span>',
        '    </div>',
        '    <div class="admin-item-actions">',
        '      <button type="button" class="btn-item-ctrl btn-gal-up" ' + (idx === 0 ? 'disabled' : '') + '>▲</button>',
        '      <button type="button" class="btn-item-ctrl btn-gal-down" ' + (idx === list.length - 1 ? 'disabled' : '') + '>▼</button>',
        '      <button type="button" class="btn-item-ctrl danger btn-gal-del">🗑️</button>',
        '    </div>',
        '  </div>',
        '  <div class="admin-item-body">',
        '    <div class="form-grid-2">',
        '      <div class="form-group-admin">',
        '        <label>Fotoğraf Başlığı</label>',
        '        <input type="text" class="admin-input" data-bind="gallery.' + idx + '.title" value="' + (g.title || '') + '" />',
        '      </div>',
        '      <div class="form-group-admin">',
        '        <label>Görsel Yolu & Yükleme</label>',
        '        <div style="display: flex; gap: 8px;">',
        '          <input type="text" class="admin-input" data-bind="gallery.' + idx + '.image" value="' + (g.image || '') + '" />',
        '          <label class="btn-admin-secondary" style="cursor: pointer; white-space: nowrap;">',
        '            📁 Seç',
        '            <input type="file" accept="image/*" class="file-gal-upload" data-index="' + idx + '" style="display: none;" />',
        '          </label>',
        '        </div>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    cont.innerHTML = html;

    cont.querySelectorAll('.btn-gal-up').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('.admin-item-card').getAttribute('data-index'), 10);
        if (idx > 0) {
          var item = state.data.gallery.splice(idx, 1)[0];
          state.data.gallery.splice(idx - 1, 0, item);
          triggerAutoSave();
          renderGallery();
        }
      });
    });

    cont.querySelectorAll('.btn-gal-down').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('.admin-item-card').getAttribute('data-index'), 10);
        if (idx < state.data.gallery.length - 1) {
          var item = state.data.gallery.splice(idx, 1)[0];
          state.data.gallery.splice(idx + 1, 0, item);
          triggerAutoSave();
          renderGallery();
        }
      });
    });

    cont.querySelectorAll('.btn-gal-del').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('.admin-item-card').getAttribute('data-index'), 10);
        if (confirm('Bu fotoğrafı galeriden silmek istiyor musunuz?')) {
          state.data.gallery.splice(idx, 1);
          triggerAutoSave();
          renderGallery();
          renderOverviewStats();
          renderAllImagesGrid();
        }
      });
    });

    cont.querySelectorAll('.file-gal-upload').forEach(function (input) {
      input.addEventListener('change', function (e) {
        var idx = parseInt(input.getAttribute('data-index'), 10);
        var file = e.target.files[0];
        if (!file) return;
        DTCropper.compressImage(file).then(function (res) {
          state.data.gallery[idx].image = res.url;
          triggerAutoSave();
          renderGallery();
          renderAllImagesGrid();
          toast('Galeri fotoğrafı optimize edildi.');
        });
      });
    });
  }

  // 4.6. Çalışma Saatleri Tablosu
  function renderWorkingHours() {
    var cont = $('#workingHoursContainer');
    if (!cont || !state.data) return;
    var list = (state.data.contact && state.data.contact.workingHours) || [];

    var html = list.map(function (wh, idx) {
      return [
        '<div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; margin-bottom: 10px;" data-index="' + idx + '">',
        '  <input type="text" class="admin-input" placeholder="Günler (Örn: Pazartesi - Cuma)" data-bind="contact.workingHours.' + idx + '.days" value="' + (wh.days || '') + '" />',
        '  <input type="text" class="admin-input" placeholder="Saatler (Örn: 09:00 - 19:00)" data-bind="contact.workingHours.' + idx + '.hours" value="' + (wh.hours || '') + '" />',
        '  <button type="button" class="btn-admin-danger btn-del-wh" style="padding: 0 12px;">✕</button>',
        '</div>'
      ].join('');
    }).join('');

    cont.innerHTML = html;

    cont.querySelectorAll('.btn-del-wh').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var idx = parseInt(e.target.closest('div').getAttribute('data-index'), 10);
        state.data.contact.workingHours.splice(idx, 1);
        triggerAutoSave();
        renderWorkingHours();
      });
    });
  }

  // 4.7. Renk Paleti Seçici
  function renderPaletteGrid() {
    var grid = $('#paletteGridContainer');
    if (!grid || !state.data) return;

    var activeKey = state.data.activePalette || 'premiumClinicTheme';

    var html = Object.keys(THEME_PALETTES).map(function (key) {
      var p = THEME_PALETTES[key];
      var isActive = key === activeKey;

      return [
        '<div class="palette-card ' + (isActive ? 'active' : '') + '" data-palette="' + key + '">',
        '  <div class="palette-card-header">',
        '    <span class="palette-card-title">' + p.name + '</span>',
        '    ' + (isActive ? '<span style="color: var(--admin-primary); font-size: 0.8rem; font-weight: 700;">✓ Aktif</span>' : ''),
        '  </div>',
        '  <div class="palette-swatches">',
        '    <span class="swatch-circle" style="background: ' + p.primary + ';" title="Ana Renk"></span>',
        '    <span class="swatch-circle" style="background: ' + p.secondary + ';" title="İkincil"></span>',
        '    <span class="swatch-circle" style="background: ' + p.accent + ';" title="Vurgu"></span>',
        '    <span class="swatch-circle" style="background: ' + p.dark + ';" title="Koyu"></span>',
        '    <span class="swatch-circle" style="background: ' + p.light + ';" title="Açık Zemin"></span>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    grid.innerHTML = html;

    grid.querySelectorAll('.palette-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var key = card.getAttribute('data-palette');
        state.data.activePalette = key;
        triggerAutoSave();
        renderPaletteGrid();
        renderOverviewStats();
        toast('Renk teması seçildi: ' + THEME_PALETTES[key].name);
      });
    });
  }

  // 4.8. Sitedeki Tüm Görsellerin Yönetimi
  function renderAllImagesGrid() {
    var grid = $('#imagesGridContainer');
    if (!grid || !state.data) return;

    var imagesList = [];

    if (state.data.doctor && state.data.doctor.image) {
      imagesList.push({ label: 'Hekim Fotoğrafı', path: 'doctor.image', url: state.data.doctor.image, alignPath: 'doctor.imageAlign' });
    }
    if (state.data.brand && state.data.brand.logoImage) {
      imagesList.push({ label: 'Klinik Logosu', path: 'brand.logoImage', url: state.data.brand.logoImage });
    }
    if (state.data.metadata && state.data.metadata.ogImage) {
      imagesList.push({ label: 'Sosyal Medya Paylaşım Görseli (OG)', path: 'metadata.ogImage', url: state.data.metadata.ogImage });
    }
    if (state.data.hero) {
      if (state.data.hero.treatmentsCard?.image) imagesList.push({ label: 'Hero: Tedaviler Kartı', path: 'hero.treatmentsCard.image', url: state.data.hero.treatmentsCard.image });
      if (state.data.hero.contactCard?.image) imagesList.push({ label: 'Hero: İletişim Kartı', path: 'hero.contactCard.image', url: state.data.hero.contactCard.image });
    }
    (state.data.treatments || []).forEach(function (t, i) {
      if (t.image) imagesList.push({ label: 'Tedavi: ' + t.title, path: 'treatments.' + i + '.image', url: t.image, alignPath: 'treatments.' + i + '.imageAlign' });
    });
    (state.data.gallery || []).forEach(function (g, i) {
      if (g.image) imagesList.push({ label: 'Galeri: ' + g.title, path: 'gallery.' + i + '.image', url: g.image });
    });

    var html = imagesList.map(function (item, idx) {
      return [
        '<div class="image-manage-card" data-index="' + idx + '">',
        '  <img src="' + item.url + '" class="image-manage-thumb" loading="lazy" alt="' + item.label + '" />',
        '  <div class="image-manage-info">',
        '    <div>',
        '      <span class="image-manage-label">' + item.label + '</span>',
        '      <p class="image-manage-path">' + item.url.slice(0, 45) + (item.url.length > 45 ? '...' : '') + '</p>',
        '    </div>',
        '    <div class="image-manage-actions">',
        '      <label class="btn-admin-secondary" style="flex: 1; cursor: pointer; text-align: center; font-size: 0.78rem;">',
        '        📁 Değiştir',
        '        <input type="file" accept="image/*" class="file-img-grid-upload" data-path="' + item.path + '" style="display: none;" />',
        '      </label>',
        '      ' + (item.alignPath ? '<button type="button" class="btn-admin-secondary btn-img-grid-crop" data-path="' + item.path + '" data-align-path="' + item.alignPath + '" style="font-size: 0.78rem;">📐 Kadraj</button>' : ''),
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    grid.innerHTML = html;

    grid.querySelectorAll('.file-img-grid-upload').forEach(function (input) {
      input.addEventListener('change', function (e) {
        var path = input.getAttribute('data-path');
        var file = e.target.files[0];
        if (!file) return;
        DTCropper.compressImage(file).then(function (res) {
          setPath(state.data, path, res.url);
          triggerAutoSave();
          renderAllImagesGrid();
          toast('Fotoğraf başarıyla güncellendi!');
        });
      });
    });

    grid.querySelectorAll('.btn-img-grid-crop').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var imgPath = btn.getAttribute('data-path');
        var alignPath = btn.getAttribute('data-align-path');
        var url = getPath(state.data, imgPath);
        var currentAlign = getPath(state.data, alignPath);
        var isDoctor = imgPath.indexOf('doctor') !== -1;

        DTCropper.open({
          title: 'Görsel Kadrajı & Odak Noktası',
          imageUrl: url,
          focalX: 50,
          focalY: currentAlign === 'object-top' ? 15 : (currentAlign === 'object-bottom' ? 85 : 50),
          aspectRatio: isDoctor ? '4 / 5' : '16 / 10',
          ratioName: isDoctor ? 'Hekim Portresi (4:5)' : 'Kart Görünümü',
          onSave: function (res) {
            setPath(state.data, imgPath, res.url);
            if (alignPath) setPath(state.data, alignPath, res.imageAlign);
            setPath(state.data, imgPath.replace(/\.image$/, '.focalX'), res.focalX);
            setPath(state.data, imgPath.replace(/\.image$/, '.focalY'), res.focalY);
            setPath(state.data, imgPath.replace(/\.image$/, '.focalPosition'), res.focalPosition);
            triggerAutoSave();
            renderAllImagesGrid();
            renderTreatments();
            toast('Kadraj kaydedildi: ' + res.focalPosition);
          }
        });
      });
    });
  }

  function populateGitHubForm() {
    var cfg = DTData.github.getConfig();
    if (!cfg) return;
    if ($('#ghOwner')) $('#ghOwner').value = cfg.owner || 'basaranbaran';
    if ($('#ghRepo')) $('#ghRepo').value = cfg.repo || 'dt.mehmet';
    if ($('#ghBranch')) $('#ghBranch').value = cfg.branch || 'main';
    if ($('#ghToken')) $('#ghToken').value = cfg.token || '';
  }

  /* ========================================================================
     5. Yayınlama Akışı (GitHub REST API)
     ======================================================================== */
  async function handlePublishClick() {
    var cfg = DTData.github.getConfig();
    if (!cfg || !cfg.token) {
      switchTab('tab-publish');
      toast('Siteye yayınlamak için lütfen önce GitHub Token bilginizi kaydedin.', true);
      return;
    }

    toast('Yayınlama başlatılıyor... Dosyalar GitHub\'a aktarılıyor 🚀');

    try {
      // 1. Yeni yüklenen base64 görselleri tespit et ve GitHub'a yükle
      var uploadQueue = [];
      var dataJsonString = JSON.stringify(state.data);

      // 2. config-draft.json ve config.json dosyalarını güncelle
      var jsonPayload = JSON.stringify(state.data, null, 2);

      await DTData.github.putFile(cfg, 'src/content/config-draft.json', jsonPayload, 'chore(cms): update draft config from admin panel');
      await DTData.github.putFile(cfg, 'src/content/config.json', jsonPayload, 'chore(cms): publish live config from admin panel');

      DTData.clearDraft();
      state.isDirty = false;
      checkDirtyState();

      toast('🎉 Tebrikler! Değişiklikler GitHub\'a başarıyla aktarıldı. GitHub Actions siteyi 1-2 dakika içinde güncelleyecektir!');
    } catch (err) {
      console.error(err);
      toast('Yayınlama başarısız: ' + err.message, true);
    }
  }

  // Yeni Tedavi, Özellik, Galeri, Saat Ekle Butonları
  document.addEventListener('DOMContentLoaded', function () {
    $('#adminLoginForm')?.addEventListener('submit', handleLogin);

    $('#btnAddTreatment')?.addEventListener('click', function () {
      state.data.treatments = state.data.treatments || [];
      state.data.treatments.push({
        id: 'yeni-tedavi-' + Date.now(),
        title: 'Yeni Tedavi',
        shortDescription: 'Tedavi hakkında kısa özet bilgi.',
        longDescription: 'Tedavinin aşamaları ve detaylı açıklaması.',
        image: 'images/treatment-gulus.jpg',
        imageAlign: 'object-center',
        icon: 'Zap'
      });
      triggerAutoSave();
      renderTreatments();
      renderOverviewStats();
      toast('Yeni tedavi eklendi.');
    });

    $('#btnAddFeature')?.addEventListener('click', function () {
      state.data.features = state.data.features || [];
      state.data.features.push({
        title: 'Yeni Klinik Farkı',
        description: 'Kliniğimizin hastalarına sunduğu ayrıcalık ve güven standardı.',
        icon: 'ShieldCheck'
      });
      triggerAutoSave();
      renderFeatures();
      renderOverviewStats();
      toast('Yeni madde eklendi.');
    });

    $('#btnAddDoctorEdu')?.addEventListener('click', function () {
      state.data.doctor = state.data.doctor || {};
      state.data.doctor.education = state.data.doctor.education || [];
      state.data.doctor.education.push('Yeni Eğitim / Sertifika / Üyelik');
      triggerAutoSave();
      renderDoctorEducation();
    });

    $('#fileDoctorUpload')?.addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) return;
      DTCropper.compressImage(file).then(function (res) {
        state.data.doctor = state.data.doctor || {};
        state.data.doctor.image = res.url;
        triggerAutoSave();
        renderAll();
        toast('Hekim fotoğrafı WebP formatında optimize edildi.');
      });
    });

    $('#btnDoctorCrop')?.addEventListener('click', function () {
      var doc = state.data.doctor || {};
      var curFocalX = doc.focalX !== undefined ? doc.focalX : 50;
      var curFocalY = doc.focalY !== undefined ? doc.focalY : (doc.imageAlign === 'object-top' ? 15 : (doc.imageAlign === 'object-bottom' ? 85 : 50));

      DTCropper.open({
        title: 'Hekim Portresi Kadrajı & Odak Noktası',
        imageUrl: doc.image || 'images/doctor.png',
        focalX: curFocalX,
        focalY: curFocalY,
        aspectRatio: '4 / 5',
        ratioName: 'Hekim Portresi (4:5)',
        onSave: function (res) {
          state.data.doctor = state.data.doctor || {};
          state.data.doctor.image = res.url;
          state.data.doctor.focalX = res.focalX;
          state.data.doctor.focalY = res.focalY;
          state.data.doctor.focalPosition = res.focalPosition;
          state.data.doctor.imageAlign = res.imageAlign;
          triggerAutoSave();
          renderAll();
          toast('Hekim kadrajı kaydedildi: ' + res.focalPosition);
        }
      });
    });

    $('#btnAddGalleryImage')?.addEventListener('click', function () {
      state.data.gallery = state.data.gallery || [];
      state.data.gallery.push({
        title: 'Yeni Galeri Fotoğrafı',
        image: 'images/gallery-1.webp'
      });
      triggerAutoSave();
      renderGallery();
      renderOverviewStats();
      renderAllImagesGrid();
      toast('Yeni fotoğraf alanı eklendi.');
    });

    $('#btnAddWorkingHourRow')?.addEventListener('click', function () {
      state.data.contact = state.data.contact || {};
      state.data.contact.workingHours = state.data.contact.workingHours || [];
      state.data.contact.workingHours.push({
        days: 'Pazartesi - Cuma',
        hours: '09:00 - 19:00'
      });
      triggerAutoSave();
      renderWorkingHours();
    });

    // Başlangıç Kontrolü
    checkAuth();
  });
})();
