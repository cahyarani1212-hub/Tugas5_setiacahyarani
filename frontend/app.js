const API = "http://127.0.0.1:8000";
const $ = (id) => document.getElementById(id);
let selectedFile = null;
let toastTimer;

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}
function setMessage(id, message, type = "") {
  const el = $(id);
  el.textContent = message;
  el.className = "message" + (type ? " " + type : "");
}
function showView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === `view-${name}`));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  const names = {dashboard:"Dashboard",dataset:"Dataset",training:"Training Model",prediction:"Prediksi"};
  $("page-title").textContent = names[name] || "Dashboard";
  if (name === "dataset") loadDataset();
  if (name === "dashboard") refreshDashboard();
}
document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => showView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => showView(b.dataset.go)));
$("refresh-btn").addEventListener("click", refreshDashboard);

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(API + path, options);
  } catch (e) {
    throw new Error("Tidak dapat terhubung ke backend. Pastikan FastAPI berjalan di http://127.0.0.1:8000.");
  }
  const raw = await response.text();
  let data;
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = {detail: raw}; }
  if (!response.ok) {
    let detail = data.detail || data.message || `HTTP ${response.status}`;
    if (typeof detail !== "string") detail = JSON.stringify(detail);
    throw new Error(detail);
  }
  return data;
}
function updateApiStatus(online) {
  $("status-dot").className = "status-dot " + (online ? "online" : "offline");
  $("status-text").textContent = online ? "Backend terhubung" : "Backend offline";
  $("side-status").textContent = online ? "Terhubung • port 8000" : "Tidak terhubung";
  document.querySelector(".api-dot").style.background = online ? "#19a873" : "#d74d4d";
}
async function checkHealth() {
  try { await request("/health"); updateApiStatus(true); return true; }
  catch (e) { updateApiStatus(false); return false; }
}
async function loadDataset() {
  try {
    const data = await request("/api/datasets");
    const items = data.items || [];
    $("dataset-count").textContent = data.total ?? items.length;
    $("table-count").textContent = `${data.total ?? items.length} baris`;
    const tbody = $("dataset-table");
    tbody.replaceChildren();
    if (!items.length) {
      const tr = document.createElement("tr"), td = document.createElement("td");
      td.colSpan = 3; td.className = "empty-cell"; td.textContent = "Belum ada data. Unggah dataset CSV terlebih dahulu."; tr.appendChild(td); tbody.appendChild(tr);
      return data;
    }
    items.forEach(row => {
      const tr = document.createElement("tr");
      ["JUMLAH_SESI", "NILAI_RATA-RATA", "KELAS"].forEach(key => {
        const td = document.createElement("td");
        td.textContent = row[key] ?? "—";
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    return data;
  } catch (e) {
    $("dataset-count").textContent = "—";
    $("table-count").textContent = "Belum tersedia";
    $("dataset-table").innerHTML = `<tr><td colspan="3" class="empty-cell"></td></tr>`;
    $("dataset-table").querySelector("td").textContent = e.message;
    throw e;
  }
}
async function loadEvaluation() {
  try {
    const ev = await request("/api/models/evaluation");
    const accuracy = typeof ev.accuracy === "number" ? `${(ev.accuracy * 100).toFixed(2)}%` : (ev.accuracy ?? "—");
    $("accuracy-value").textContent = accuracy;
    $("train-accuracy").textContent = accuracy;
    $("test-rows").textContent = ev.test_rows ?? "—";
    $("model-status").textContent = "Terlatih";
    $("model-caption").textContent = "Evaluasi tersedia";
    $("train-state").textContent = "Terlatih";
    $("train-features").textContent = "Fitur: " + ((ev.features || []).join(", ") || "—");
    return ev;
  } catch {
    $("accuracy-value").textContent = "—";
    $("train-accuracy").textContent = "—";
    $("test-rows").textContent = "—";
    $("model-status").textContent = "Belum dilatih";
    $("model-caption").textContent = "Latih model untuk memulai";
    $("train-state").textContent = "Belum dilatih";
    $("train-features").textContent = "Fitur: —";
    return null;
  }
}
async function refreshDashboard() {
  await checkHealth();
  try { await loadDataset(); } catch {}
  await loadEvaluation();
}
$("csv-file").addEventListener("change", e => {
  selectedFile = e.target.files[0] || null;
  $("file-name").textContent = selectedFile ? selectedFile.name : "Format yang didukung: .csv";
  setMessage("upload-message", "");
});
$("upload-btn").addEventListener("click", async () => {
  if (!selectedFile) { setMessage("upload-message", "Pilih file CSV terlebih dahulu.", "error"); return; }
  const btn = $("upload-btn");
  btn.disabled = true; btn.textContent = "Mengunggah...";
  setMessage("upload-message", "Mengirim dataset ke backend...");
  try {
    const form = new FormData();
    form.append("file", selectedFile);
    const result = await request("/api/datasets/upload", {method:"POST", body:form});
    setMessage("upload-message", `${result.message || "Dataset berhasil dimuat"} • ${result.rows ?? "?"} baris`, "success");
    toast("Dataset berhasil diunggah");
    await loadDataset();
    await loadEvaluation();
  } catch (e) { setMessage("upload-message", e.message, "error"); }
  finally { btn.disabled = false; btn.textContent = "Unggah Dataset"; }
});
$("train-btn").addEventListener("click", async () => {
  const btn = $("train-btn");
  btn.disabled = true; btn.textContent = "Training berjalan...";
  setMessage("train-message", "Model sedang dilatih. Tunggu respons backend...");
  try {
    const result = await request("/api/models/train", {method:"POST"});
    const accuracy = typeof result.accuracy === "number" ? `${(result.accuracy * 100).toFixed(2)}%` : (result.accuracy ?? "—");
    $("train-accuracy").textContent = accuracy;
    $("accuracy-value").textContent = accuracy;
    $("test-rows").textContent = result.test_rows ?? "—";
    $("train-state").textContent = "Terlatih";
    $("model-status").textContent = "Terlatih";
    $("model-caption").textContent = "Evaluasi tersedia";
    $("train-features").textContent = "Fitur: " + ((result.features || []).join(", ") || "—");
    setMessage("train-message", `${result.message || "Training berhasil"} • Accuracy ${accuracy}`, "success");
    toast("Training model berhasil");
  } catch (e) { setMessage("train-message", e.message, "error"); }
  finally { btn.disabled = false; btn.textContent = "▶ Jalankan Training"; }
});
$("prediction-form").addEventListener("submit", async e => {
  e.preventDefault();
  const jumlah = Number($("jumlah-sesi").value);
  const nilai = Number($("nilai-rata").value);
  if (jumlah < 0 || nilai < 0 || nilai > 100) {
    setMessage("prediction-message", "Periksa input: jumlah sesi minimal 0 dan nilai rata-rata 0–100.", "error"); return;
  }
  const btn = $("predict-btn");
  btn.disabled = true; btn.textContent = "Memproses prediksi...";
  setMessage("prediction-message", "Mengirim input ke model...");
  try {
    const result = await request("/api/predictions/single", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({jumlah_sesi:jumlah, nilai_rata_rata:nilai})
    });
    $("predicted-class").textContent = result.predicted_class ?? "—";
    $("result-inputs").replaceChildren();
    [`Jumlah sesi: ${jumlah}`, `Nilai rata-rata: ${nilai}`].forEach(t => {
      const span = document.createElement("span"); span.textContent = t; $("result-inputs").appendChild(span);
    });
    $("prediction-empty").hidden = true;
    $("prediction-result").hidden = false;
    setMessage("prediction-message", "Prediksi berhasil diterima dari backend.", "success");
    toast("Prediksi berhasil");
  } catch (e) { setMessage("prediction-message", e.message, "error"); }
  finally { btn.disabled = false; btn.innerHTML = 'Jalankan Prediksi <span>→</span>'; }
});

(async () => {
  await refreshDashboard();
  // Evaluation is refreshed when the page loads and after training.
})();
