const settingsForm = document.getElementById('settingsForm');
const submissionsList = document.getElementById('submissionsList');
const settingsStatus = document.getElementById('settingsStatus');
const submissionCount = document.getElementById('submissionCount');

const getValue = (id) => document.getElementById(id).value.trim();
const getChecked = (id) => document.getElementById(id).checked;

const setValue = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.value = value ?? '';
  }
};

const setChecked = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.checked = Boolean(value);
  }
};

const populateSettings = (settings) => {
  setValue('businessName', settings.businessName);
  setValue('tagline', settings.tagline);
  setValue('heroBadge', settings.heroBadge);
  setValue('heroTitle', settings.heroTitle);
  setValue('heroSubtitle', settings.heroSubtitle);
  setValue('phone', settings.phone);
  setValue('whatsappNumber', settings.whatsappNumber);
  setValue('email', settings.email);
  setValue('address', settings.address);
  setValue('mapLink', settings.mapLink);
  setValue('workingHours', settings.workingHours);
  setValue('footerNote', settings.footerNote);

  setValue('instagramUrl', settings.socials?.instagram?.url);
  setChecked('instagramEnabled', settings.socials?.instagram?.enabled);
  setValue('whatsappUrl', settings.socials?.whatsapp?.url);
  setChecked('whatsappEnabled', settings.socials?.whatsapp?.enabled);
  setValue('facebookUrl', settings.socials?.facebook?.url);
  setChecked('facebookEnabled', settings.socials?.facebook?.enabled);
  setValue('tiktokUrl', settings.socials?.tiktok?.url);
  setChecked('tiktokEnabled', settings.socials?.tiktok?.enabled);
  setValue('xUrl', settings.socials?.x?.url);
  setChecked('xEnabled', settings.socials?.x?.enabled);

  setValue('acRepairImage', settings.serviceImages?.acRepair);
  setValue('fridgeRepairImage', settings.serviceImages?.fridgeRepair);
  setValue('washingMachineRepairImage', settings.serviceImages?.washingMachineRepair);
  setValue('electronicsRepairImage', settings.serviceImages?.electronicsRepair);
};

const renderSubmissions = (submissions) => {
  submissionCount.textContent = String(submissions.length);

  if (!submissions.length) {
    submissionsList.innerHTML = '<div class="empty-state">No client requests have arrived yet.</div>';
    return;
  }

  submissionsList.innerHTML = submissions
    .map(
      (submission) => `
        <article class="submission-card">
          <strong>${submission.name}</strong>
          <p>${submission.message}</p>
          <div class="submission-meta">
            <span><strong>Phone:</strong> ${submission.phone}</span>
            <span><strong>Service:</strong> ${submission.serviceType}</span>
            <span><strong>Location:</strong> ${submission.location || 'Not provided'}</span>
            <span><strong>Preferred Date:</strong> ${submission.preferredDate || 'Not provided'}</span>
            <span><strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}</span>
          </div>
        </article>
      `,
    )
    .join('');
};

const loadDashboard = async () => {
  const [settingsResponse, submissionsResponse] = await Promise.all([
    fetch('/api/admin/settings'),
    fetch('/api/admin/contact-submissions'),
  ]);

  const settings = await settingsResponse.json();
  const submissions = await submissionsResponse.json();

  populateSettings(settings);
  renderSubmissions(submissions);
};

settingsForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    businessName: getValue('businessName'),
    tagline: getValue('tagline'),
    heroBadge: getValue('heroBadge'),
    heroTitle: getValue('heroTitle'),
    heroSubtitle: getValue('heroSubtitle'),
    phone: getValue('phone'),
    whatsappNumber: getValue('whatsappNumber'),
    email: getValue('email'),
    address: getValue('address'),
    mapLink: getValue('mapLink'),
    workingHours: getValue('workingHours'),
    footerNote: getValue('footerNote'),
    socials: {
      instagram: {
        url: getValue('instagramUrl'),
        enabled: getChecked('instagramEnabled'),
      },
      whatsapp: {
        url: getValue('whatsappUrl'),
        enabled: getChecked('whatsappEnabled'),
      },
      facebook: {
        url: getValue('facebookUrl'),
        enabled: getChecked('facebookEnabled'),
      },
      tiktok: {
        url: getValue('tiktokUrl'),
        enabled: getChecked('tiktokEnabled'),
      },
      x: {
        url: getValue('xUrl'),
        enabled: getChecked('xEnabled'),
      },
    },
    serviceImages: {
      acRepair: getValue('acRepairImage'),
      fridgeRepair: getValue('fridgeRepairImage'),
      washingMachineRepair: getValue('washingMachineRepairImage'),
      electronicsRepair: getValue('electronicsRepairImage'),
    },
  };

  try {
    settingsStatus.textContent = '';

    const response = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Unable to save settings');
    }

    settingsStatus.textContent = 'Portfolio settings saved successfully.';
  } catch (error) {
    settingsStatus.textContent = 'Settings could not be saved right now.';
  }
});

loadDashboard();
