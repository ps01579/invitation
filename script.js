(function () {
  const data = window.SITE_DATA;
  if (!data) return;

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element && value != null) {
      element.innerHTML = String(value).replace(/\n/g, "<br />");
    }
  };

  setText("heroLabel", data.heroLabel);
  setText("mainTitle", data.title);
  setText("heroSubtitle", data.subtitle);
  setText("heroDate", data.heroDate);
  setText("heroVenue", data.heroVenue);
  setText("invitationMessage", data.invitationMessage);
  setText("hostLine", data.hostLine);
  setText("eventDateText", data.eventDateText);
  setText("venueName", data.venueName);
  setText("venueAddress", data.venueAddress);
  setText("contactText", data.contactText);
  setText("footerText", data.footerText);
  setText("mapVenueName", data.venueName);
  setText("mapVenueAddress", data.venueAddress);

  const naverMapLink = document.getElementById("naverMapLink");
  const kakaoMapLink = document.getElementById("kakaoMapLink");
  if (naverMapLink && data.mapLinks?.naver) naverMapLink.href = data.mapLinks.naver;
  if (kakaoMapLink && data.mapLinks?.kakao) kakaoMapLink.href = data.mapLinks.kakao;

  const trafficList = document.getElementById("trafficList");
  if (trafficList && Array.isArray(data.traffic)) {
    trafficList.innerHTML = data.traffic.map(item => `<li>${item}</li>`).join("");
  }

  const gallery = document.getElementById("gallery");
  if (gallery && Array.isArray(data.gallery)) {
    gallery.innerHTML = data.gallery.map(item => `
      <figure class="gallery-item">
        <img src="${item.src}" alt="${item.alt || ''}" loading="lazy" />
      </figure>
    `).join("");
  }

  const accountList = document.getElementById("accountList");
  if (accountList && Array.isArray(data.accounts)) {
    accountList.innerHTML = data.accounts.map((account, index) => `
      <article class="account-item">
        <div class="account-content">
          <p class="account-name">${account.name}</p>
          <p class="account-number">${account.bank} ${account.number}</p>
          <p class="account-holder">예금주 : ${account.holder}</p>
        </div>
        <button class="copy-button" type="button" data-copy="${account.bank} ${account.number} ${account.holder}">복사</button>
      </article>
    `).join("");
  }

  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  };

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("복사되었습니다.");
    } catch (error) {
      showToast("복사에 실패했습니다.");
      console.error(error);
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches(".copy-button")) {
      copyText(target.dataset.copy || "");
    }

    if (target.id === "copyAddressButton") {
      copyText(data.venueAddress || "");
    }
  });
})();
