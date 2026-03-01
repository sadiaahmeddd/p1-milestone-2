const output = document.getElementById('output');
const meta = document.getElementById('meta');

const show = async (res) => {
  meta.textContent = `Status: ${res.status} ${res.statusText}`;
  const text = await res.text();

  if (!text) {
    output.textContent = '';
    return;
  }

  try {
    output.textContent = JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    output.textContent = text;
  }
};

// Client sends Accept + Content-Type headers

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const params = new URLSearchParams();
  for (const [k, v] of form.entries()) {
    if (String(v).trim()) params.set(k, v);
  }

  const res = await fetch(`/api/pokemon?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  show(res);
});

document.getElementById('typesBtn').addEventListener('click', async () => {
  const res = await fetch('/api/types', {
    headers: { Accept: 'application/json' },
  });
  show(res);
});

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = new URLSearchParams(new FormData(e.target));
  const res = await fetch('/api/addPokemon', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,

    
  });

  show(res);
});

document.getElementById('editForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const body = new URLSearchParams();
  for (const [k, v] of form.entries()) {
    if (String(v).trim()) body.set(k, v);
  }

  const res = await fetch('/api/editPokemon', {
    method: 'POST',
    


    
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  show(res);
});