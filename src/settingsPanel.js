const Settings = ZLibrary.Settings;

function logo() {
  let logo = document.createElement('img');

  logo.src = 'https://media.discordapp.net/attachments/846781793834106902/946425651634765824/overkill_logo_final.png';
  logo.style = 'max-width: 100%; height: auto;';

  return logo;
}

function subtitle() {
  let subtitle = document.createElement('p');

  subtitle.innerHTML =
    'PluralKit integration for BetterDiscord<br>- by <b><span style="color: #ff002a;">ash taylor</span></b> -';
  subtitle.style = 'text-align: center; color: var(--header-primary);';

  return subtitle;
}

function doColourText(settings) {
  return new Settings.Switch('Colored proxy text', '', settings.get().doColourText, val => {
    settings.update(function (s) {
      return { ...s, doColourText: val };
    });
  });
}

function memberColorPref(settings) {
  return new Settings.Dropdown(
    'Default member name color',
    '',
    settings.get().memberColourPref,
    [
      { label: 'Member', value: 0 },
      { label: 'System', value: 1 },
      { label: 'Theme', value: 2 },
    ],
    val => {
      settings.update(function (s) {
        return { ...s, memberColorPref: val };
      });
    },
  );
}

function tagColourPref(settings) {
  return new Settings.Dropdown(
    'Default system tag color',
    '',
    settings.get().tagColourPref,
    [
      { label: 'Member', value: 0 },
      { label: 'System', value: 1 },
      { label: 'Theme', value: 2 },
    ],
    val => {
      settings.update(function (s) {
        return { ...s, tagColourPref: val };
      });
    },
  );
}

function useServerNames(settings) {
  return new Settings.Switch('Use servernames (experimental)', '', settings.get().useServerNames, val => {
    settings.update(function (s) {
      return { ...s, useServerNames: val };
    });
  });
}

function preferencesPanel(settings) {
  let preferencesPanel = new Settings.SettingGroup('Preferences', {
    shown: false,
  });

  preferencesPanel.append(
    doColourText(settings),
    memberColorPref(settings),
    tagColourPref(settings),
    useServerNames(settings),
  );

  return preferencesPanel;
}

function doContrastTest(settings) {
  return new Settings.Switch(
    'Enable text contrast test',
    "Uses the theme's default color if the proxy's contrast is too low",
    settings.get().doContrastTest,
    val => {
      settings.update(function (s) {
        return { ...s, doContrastTest: val };
      });
    },
  );
}

function contrastTestColour(settings) {
  return new Settings.ColorPicker(
    'Contrast test color',
    'The background color that proxy text will be tested against (black for dark themes, white for light themes)',
    settings.get().contrastTestColour,
    hex => {
      settings.update(function (s) {
        return { ...s, contrastTestColour: hex };
      });
    },
  );
}

function contrastThreshold(settings) {
  return new Settings.Slider(
    'Contrast ratio threshold',
    'Minimum contrast ratio for proxy colors (default: 3)',
    1,
    21,
    settings.get().contrastThreshold,
    val => {
      settings.update(function (s) {
        return { ...s, contrastThreshold: val };
      });
    },
    { markers: [1, 2, 3, 4.5, 7, 14, 21] },
  );
}

function accessibilityPanel(settings) {
  // Contrast test settings
  let accessibilityPanel = new Settings.SettingGroup('Accessibility', {
    shown: false,
  });

  accessibilityPanel.append(doContrastTest(settings), contrastTestColour(settings), contrastThreshold(settings));

  return accessibilityPanel;
}

function cachePanel(profileMap) {
  // Cache
  let cachePanel = new Settings.SettingGroup('Cache', { shown: false });
  let resetCacheBtn = document.createElement('button');
  resetCacheBtn.className = 'button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeSmall-wU2dO- grow-2sR_-F';
  resetCacheBtn.innerHTML = 'Delete Cache';
  resetCacheBtn.onclick = () => {
    profileMap.clear();
  };

  cachePanel.append(resetCacheBtn).class;

  return cachePanel;
}

function settingsPanel(settings, profileMap) {
  let settingsPanel = new Settings.SettingPanel();

  settingsPanel.append(
    logo(),
    subtitle(),
    preferencesPanel(settings),
    accessibilityPanel(settings),
    cachePanel(profileMap),
  );

  return settingsPanel.getElement();
}

module.exports = { settingsPanel };
