const API_BASE = import.meta.env.VITE_API_URL || '';

async function safeFetch(path, options = {}) {
  if (!API_BASE && window.location.hostname !== 'localhost') {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2200);
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchPortfolioBootstrap() {
  return safeFetch('/api/bootstrap');
}

export async function submitEnquiry(payload) {
  const res = await safeFetch('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (res && res.success) {
    return { mode: 'backend', data: res };
  }
  return {
    mode: 'demo',
    data: {
      success: true,
      message:
        'Demo Preview: Enquiry captured locally in browser state. Connect the Express + MongoDB backend to persist submissions.',
    },
  };
}

