"use strict";

const certifications = [
  {
    title: "TOPCIT Level 3",
    issuer: "IITP",
    description: "Achieved Level 3 in TOPCIT with a score of 613/1000.",
    icon: "award",
    fileUrl: "assets/certificates/Score certificate.pdf",
  },
  {
    title: "Personal Financial Management",
    issuer: "DSWD & Bangko Sentral ng Pilipinas",
    description: "Completed training certified by DSWD and Bangko Sentral ng Pilipinas (2026).",
    icon: "chart",
    fileUrl: "assets/certificates/Certificate of Participation.pdf",
  },
  {
    title: "Gender Sensitivity Awareness",
    issuer: "Gender and Development (GAD)",
    description: "Gender and Development (GAD) training (2025) · Certificate 1 of 2.",
    icon: "people",
    fileUrl: "assets/certificates/Guerrero%20(1).pdf",
  },
  {
    title: "Gender Sensitivity Awareness",
    issuer: "Gender and Development (GAD)",
    description: "Gender and Development (GAD) training (2025) · Certificate 2 of 2.",
    icon: "people",
    fileUrl: "assets/certificates/YEAR%202025%20template%20(19)_20251021_162144_0018.png",
  },
  {
    title: "AI-Powered Cybersecurity",
    issuer: "SHE++ Career Development",
    description: "Completed training with SHE++ Career Development (2025).",
    icon: "shield",
    fileUrl: "assets/certificates/Certificate for Aruiz Dean C. Guerrero for __.pdf",
  },
  {
    title: "Microsoft Digital Literacy",
    issuer: "Microsoft",
    description: "Certificate in Microsoft Digital Literacy.",
    icon: "award",
    fileUrl: "assets/certificates/microsoft%20digital%20literacy.png",
  },
  {
    title: "Google Cloud Fundamentals",
    issuer: "",
    description: "Completed fundamentals training in Google Cloud.",
    icon: "google",
    fileUrl: "",
  },
  {
    title: "Microsoft Azure Fundamentals",
    issuer: "",
    description: "Completed fundamentals training in Microsoft Azure.",
    icon: "microsoft",
    fileUrl: "",
  },
  {
    title: "Developing Designs for User Experience",
    issuer: "Training Certificate",
    description: "Certificate in developing designs for user experience.",
    icon: "people",
    fileUrl: "assets/certificates/dev%20design.png",
  },
  {
    title: "English as a Medium of Instruction",
    issuer: "TESDA",
    description: "TESDA certificate in English as a Medium of Instruction.",
    icon: "award",
    fileUrl: "assets/certificates/Certificate_of_Completion_new.pdf.png",
  },
  {
    title: "Cash-for-Work (CFW) Work Experience",
    issuer: "DSWD Cash-for-Work Program",
    description: "Certificate related to the Planning & Development Office assistant role at Pamantasan ng Lungsod ng Pasig.",
    icon: "award",
    fileUrl: "assets/certificates/cfw_Guerrero.png",
  },
];

const certificationGrid = document.querySelector("#certification-grid");
const modal = document.querySelector("#certificate-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const closeButton = document.querySelector(".modal-close");

const certificationIcons = {
  google: '<span class="certificate-brand-google" aria-hidden="true">G</span>',
  microsoft: '<svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d="M4 5h18v18H4zM26 5h18v18H26zM4 27h18v18H4zM26 27h18v18H26z"/></svg>',
};

function renderCertifications() {
  certificationGrid.innerHTML = certifications.map((certification, index) => {
    const hasFile = Boolean(certification.fileUrl);
    const isImage = hasFile && /\.(png|jpe?g|webp|gif)(?:[?#]|$)/i.test(certification.fileUrl);
    const preview = !hasFile
      ? `<span class="certificate-icon-badge">${certificationIcons[certification.icon] || ""}</span>`
      : isImage
        ? `<img src="${escapeHtml(certification.fileUrl)}" alt="${escapeHtml(certification.title)} certificate preview" loading="lazy">`
        : `<iframe src="${escapeHtml(certification.fileUrl)}#toolbar=0&amp;navpanes=0&amp;scrollbar=0" title="${escapeHtml(certification.title)} certificate preview" tabindex="-1" loading="lazy"></iframe>`;
    const issuer = certification.issuer
      ? `<p class="certificate-issuer">${escapeHtml(certification.issuer)}</p>`
      : "";
    const viewButton = hasFile
      ? `<button class="button button-outline" type="button" data-certificate-index="${index}">
            <span>View Certificate</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M14 4h6v6m-11 4L20 4"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></svg>
          </button>`
      : "";
    return `
      <article class="card certificate-card">
        <div class="certificate-showcase${hasFile ? "" : " certificate-showcase-icon"}">
          ${preview}
          ${hasFile ? `<span class="certificate-preview-label">${isImage ? "IMAGE" : "PDF"}</span>` : ""}
        </div>
        <div class="certificate-content">
          <h3>${escapeHtml(certification.title)}</h3>
          ${issuer}
          <p class="certificate-description">${escapeHtml(certification.description)}</p>
          ${viewButton}
        </div>
      </article>`;
  }).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function showMissingCertificate(fileUrl) {
  const message = document.createElement("div");
  message.className = "modal-message";
  const heading = document.createElement("strong");
  heading.textContent = "Certificate file not found";
  const text = document.createElement("span");
  text.textContent = "Add the certificate PDF or image to the linked path to preview it here.";
  message.append(heading, text);

  const link = document.createElement("a");
  link.className = "modal-download";
  link.href = fileUrl;
  link.textContent = "Open certificate file";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  message.append(link);
  modalBody.replaceChildren(message);
}

function openCertificate(certification) {
  modalTitle.textContent = certification.title;
  modalBody.replaceChildren();

  const fileUrl = certification.fileUrl;
  const extension = fileUrl.split(".").pop().toLowerCase().split(/[?#]/)[0];
  if (extension === "pdf") {
    const frame = document.createElement("iframe");
    frame.title = `${certification.title} certificate`;
    frame.addEventListener("error", () => showMissingCertificate(fileUrl), { once: true });
    frame.addEventListener("load", () => {
      const frameDocument = frame.contentDocument;
      if (frameDocument && frameDocument.URL.startsWith("chrome-error:")) {
        showMissingCertificate(fileUrl);
      }
    }, { once: true });
    frame.src = fileUrl;
    modalBody.append(frame);
  } else if (["png", "jpg", "jpeg", "webp", "gif"].includes(extension)) {
    const image = document.createElement("img");
    image.alt = `${certification.title} certificate`;
    image.src = fileUrl;
    image.addEventListener("error", () => showMissingCertificate(fileUrl), { once: true });
    modalBody.append(image);
  } else {
    showMissingCertificate(fileUrl);
  }

  modal.showModal();
  closeButton.focus();
}

certificationGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-certificate-index]");
  if (!button) return;

  const certification = certifications[Number(button.dataset.certificateIndex)];
  if (certification) openCertificate(certification);
});

closeButton.addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});
modal.addEventListener("close", () => {
  modalBody.replaceChildren();
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
renderCertifications();