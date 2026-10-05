import type { Locale } from "./config";

export type LegalDoc = {
  intro: string;
  sections: { id: string; title: string; paras?: string[]; list?: string[] }[];
};

type Docs = { privacy: LegalDoc; terms: LegalDoc };

/** Template legal copy — to be reviewed by the client's lawyer before launch. */
export const legal: Record<Locale, Docs> = {
  en: {
    privacy: {
      intro: "Your privacy is part of the service. This page explains what we collect, why, and how you stay in control.",
      sections: [
        { id: "who-we-are", title: "Who we are", paras: ["VAULT Private Automobiles (“VAULT”, “we”, “us”) is the controller of the personal data described in this policy. You can reach us at any time through the contact page or by phone."] },
        { id: "data-we-collect", title: "Data we collect", paras: ["We only collect what you choose to give us, and what is needed to answer you:"], list: ["Contact details — name, phone or WhatsApp number, email address, preferred contact method.", "Your enquiry — the vehicle or service you are interested in and any message you send.", "Vehicle details — brand, model, year, mileage, condition and photos, if you offer a car for sale.", "Auction participation — identity and verification details, only if you request to bid."] },
        { id: "how-we-use", title: "How we use your data", list: ["To reply to your enquiry and arrange private viewings.", "To evaluate and present a vehicle you wish to sell.", "To verify bidders and run private auctions.", "To meet legal, accounting and anti-money-laundering obligations."] },
        { id: "legal-basis", title: "Legal basis", paras: ["We process your data to take steps at your request before entering into a contract, to perform a contract with you, to comply with legal obligations, and — for keeping in touch about similar vehicles — on the basis of our legitimate interest or your consent, which you can withdraw at any time."] },
        { id: "sharing", title: "Sharing", paras: ["Discretion is the core of our service. We never sell your data. We share it only with parties strictly needed to complete a transaction — such as inspection partners, logistics providers, payment institutions or public authorities — and only the minimum required."] },
        { id: "retention", title: "Retention", paras: ["Enquiries that do not lead to a transaction are deleted within 24 months. Transaction records are kept for the period required by tax and accounting law."] },
        { id: "cookies", title: "Cookies and local storage", paras: ["This website does not use advertising or tracking cookies. It remembers your chosen language in a small cookie, and your browser keeps one note for the current visit only — whether the intro has already played — so it is not shown again on every page. Enquiries you send through our forms are delivered to our team via Telegram."] },
        { id: "your-rights", title: "Your rights", paras: ["You may request access to, correction or deletion of your data, restrict or object to its processing, and ask for a copy in a portable format. You also have the right to lodge a complaint with your national data protection authority. To exercise any right, contact us — we respond within 30 days."] },
        { id: "security", title: "Security", paras: ["Access to client data is limited to the team members who handle your request. We use encrypted connections and trusted providers to store information."] },
        { id: "changes", title: "Changes to this policy", paras: ["We may update this policy from time to time. The date at the top shows the latest version."] },
      ],
    },
    terms: {
      intro: "Clear rules for a discreet service. Please read them before sending an enquiry or taking part in an auction.",
      sections: [
        { id: "acceptance", title: "Acceptance", paras: ["By using this website you agree to these terms. If you do not agree, please do not use the site. Separate written agreements apply to any purchase, sale, consignment or auction."] },
        { id: "information", title: "Vehicle information", paras: ["Vehicles, specifications and images are presented for information only and do not constitute a binding offer. Availability, condition and price are confirmed in writing before any transaction. Imagery may be illustrative."] },
        { id: "enquiries", title: "Enquiries and private viewings", paras: ["Sending a request does not create an obligation for either party. Private viewings are arranged by appointment and may require identity verification."] },
        { id: "selling", title: "Selling your vehicle", paras: ["When you submit a vehicle you confirm that you own it or are authorised to sell it, and that the information and photos you provide are accurate. Any valuation is indicative until confirmed by inspection."] },
        { id: "auctions", title: "Private auctions", paras: ["Auctions are by invitation only. Participation, bidding, reserve prices, fees and payment terms are governed by the auction conditions provided to verified bidders. Countdown timers on this website are indicative."] },
        { id: "ip", title: "Intellectual property", paras: ["The VAULT name, logo, texts, design and imagery on this website belong to VAULT or its licensors and may not be copied or reused without written permission. Vehicle brands and trademarks belong to their respective owners."] },
        { id: "liability", title: "Liability", paras: ["We take care to keep this website accurate and available, but we do not guarantee it is free of errors or interruptions. To the extent permitted by law, VAULT is not liable for indirect losses arising from the use of the website."] },
        { id: "links", title: "Third-party links", paras: ["Links to external services such as WhatsApp, Instagram, YouTube or Telegram are provided for convenience. Their own terms and privacy policies apply."] },
        { id: "law", title: "Governing law", paras: ["These terms are governed by the laws of the country in which VAULT is registered. Disputes will first be addressed amicably and, failing that, by the competent courts of that jurisdiction."] },
        { id: "changes", title: "Changes", paras: ["We may update these terms. Continued use of the website after an update means you accept the new version."] },
      ],
    },
  },
  ro: {
    privacy: {
      intro: "Confidențialitatea dumneavoastră face parte din serviciu. Această pagină explică ce date colectăm, de ce și cum păstrați controlul asupra lor.",
      sections: [
        { id: "who-we-are", title: "Cine suntem", paras: ["VAULT Private Automobiles („VAULT”, „noi”) este operatorul datelor personale descrise în această politică. Ne puteți contacta oricând prin pagina de contact sau telefonic."] },
        { id: "data-we-collect", title: "Datele pe care le colectăm", paras: ["Colectăm doar ce alegeți să ne transmiteți și ce este necesar pentru a vă răspunde:"], list: ["Date de contact — nume, număr de telefon sau WhatsApp, adresă de e-mail, metoda de contact preferată.", "Solicitarea dumneavoastră — vehiculul sau serviciul care vă interesează și orice mesaj trimis.", "Detalii despre vehicul — marcă, model, an, kilometraj, stare și fotografii, dacă oferiți un automobil spre vânzare.", "Participarea la licitații — date de identitate și verificare, doar dacă solicitați să licitați."] },
        { id: "how-we-use", title: "Cum folosim datele", list: ["Pentru a răspunde solicitării și a organiza vizionări private.", "Pentru a evalua și prezenta vehiculul pe care doriți să îl vindeți.", "Pentru a verifica ofertanții și a organiza licitații private.", "Pentru a respecta obligațiile legale, contabile și de prevenire a spălării banilor."] },
        { id: "legal-basis", title: "Temeiul legal", paras: ["Prelucrăm datele pentru a face demersuri la cererea dumneavoastră înainte de încheierea unui contract, pentru executarea unui contract, pentru respectarea obligațiilor legale și — pentru a vă informa despre vehicule similare — în baza interesului nostru legitim sau a consimțământului dumneavoastră, pe care îl puteți retrage oricând."] },
        { id: "sharing", title: "Transmiterea datelor", paras: ["Discreția este esența serviciului nostru. Nu vindem niciodată datele dumneavoastră. Le transmitem doar părților strict necesare pentru finalizarea unei tranzacții — parteneri de inspecție, furnizori de logistică, instituții de plată sau autorități publice — și doar în măsura minimă necesară."] },
        { id: "retention", title: "Păstrarea datelor", paras: ["Solicitările care nu duc la o tranzacție sunt șterse în cel mult 24 de luni. Evidențele tranzacțiilor sunt păstrate pe perioada impusă de legislația fiscală și contabilă."] },
        { id: "cookies", title: "Cookie-uri și stocare locală", paras: ["Acest site nu folosește cookie-uri de publicitate sau de urmărire. Memorează limba aleasă într-un cookie mic, iar browserul păstrează o singură notă doar pe durata vizitei — dacă introducerea a fost deja redată — pentru a nu fi afișată pe fiecare pagină. Solicitările trimise prin formulare ajung la echipa noastră prin Telegram."] },
        { id: "your-rights", title: "Drepturile dumneavoastră", paras: ["Puteți solicita accesul la date, rectificarea sau ștergerea lor, restricționarea sau opoziția la prelucrare, precum și o copie într-un format portabil. Aveți și dreptul de a depune o plângere la autoritatea națională de protecție a datelor. Pentru a vă exercita drepturile, contactați-ne — răspundem în cel mult 30 de zile."] },
        { id: "security", title: "Securitate", paras: ["Accesul la datele clienților este limitat la membrii echipei care gestionează solicitarea. Folosim conexiuni criptate și furnizori de încredere pentru stocarea informațiilor."] },
        { id: "changes", title: "Modificări ale politicii", paras: ["Putem actualiza periodic această politică. Data din partea de sus indică cea mai recentă versiune."] },
      ],
    },
    terms: {
      intro: "Reguli clare pentru un serviciu discret. Vă rugăm să le citiți înainte de a trimite o solicitare sau de a participa la o licitație.",
      sections: [
        { id: "acceptance", title: "Acceptare", paras: ["Prin utilizarea acestui site sunteți de acord cu acești termeni. Dacă nu sunteți de acord, vă rugăm să nu utilizați site-ul. Oricărei cumpărări, vânzări, consignații sau licitații i se aplică acorduri scrise separate."] },
        { id: "information", title: "Informații despre vehicule", paras: ["Vehiculele, specificațiile și imaginile sunt prezentate cu titlu informativ și nu constituie o ofertă fermă. Disponibilitatea, starea și prețul sunt confirmate în scris înaintea oricărei tranzacții. Imaginile pot fi ilustrative."] },
        { id: "enquiries", title: "Solicitări și vizionări private", paras: ["Trimiterea unei solicitări nu creează obligații pentru niciuna dintre părți. Vizionările private se organizează pe bază de programare și pot necesita verificarea identității."] },
        { id: "selling", title: "Vânzarea vehiculului", paras: ["Trimițând un vehicul, confirmați că sunteți proprietarul sau că aveți dreptul să îl vindeți și că informațiile și fotografiile oferite sunt corecte. Orice evaluare este orientativă până la confirmarea prin inspecție."] },
        { id: "auctions", title: "Licitații private", paras: ["Licitațiile se desfășoară doar pe bază de invitație. Participarea, ofertarea, prețurile de rezervă, comisioanele și condițiile de plată sunt reglementate de condițiile licitației transmise ofertanților verificați. Cronometrele de pe site sunt orientative."] },
        { id: "ip", title: "Proprietate intelectuală", paras: ["Numele VAULT, logo-ul, textele, designul și imaginile de pe acest site aparțin VAULT sau licențiatorilor săi și nu pot fi copiate sau reutilizate fără acord scris. Mărcile auto aparțin proprietarilor lor."] },
        { id: "liability", title: "Răspundere", paras: ["Ne străduim ca acest site să fie corect și disponibil, dar nu garantăm că este lipsit de erori sau întreruperi. În limitele permise de lege, VAULT nu răspunde pentru pierderi indirecte rezultate din utilizarea site-ului."] },
        { id: "links", title: "Linkuri către terți", paras: ["Linkurile către servicii externe precum WhatsApp, Instagram, YouTube sau Telegram sunt oferite pentru comoditate. Se aplică termenii și politicile de confidențialitate ale acestora."] },
        { id: "law", title: "Legea aplicabilă", paras: ["Acești termeni sunt guvernați de legislația țării în care este înregistrat VAULT. Litigiile vor fi soluționate mai întâi pe cale amiabilă, iar în caz contrar de instanțele competente din acea jurisdicție."] },
        { id: "changes", title: "Modificări", paras: ["Putem actualiza acești termeni. Utilizarea în continuare a site-ului după o actualizare înseamnă acceptarea noii versiuni."] },
      ],
    },
  },
  ru: {
    privacy: {
      intro: "Конфиденциальность — часть нашего сервиса. Здесь объясняется, какие данные мы собираем, зачем и как вы сохраняете над ними контроль.",
      sections: [
        { id: "who-we-are", title: "Кто мы", paras: ["VAULT Private Automobiles («VAULT», «мы») является оператором персональных данных, описанных в этой политике. Связаться с нами можно в любое время через страницу контактов или по телефону."] },
        { id: "data-we-collect", title: "Какие данные мы собираем", paras: ["Мы собираем только то, что вы сами решили нам сообщить, и то, что нужно для ответа:"], list: ["Контактные данные — имя, номер телефона или WhatsApp, e-mail, удобный способ связи.", "Ваш запрос — интересующий автомобиль или услуга и текст сообщения.", "Данные об автомобиле — марка, модель, год, пробег, состояние и фото, если вы предлагаете машину на продажу.", "Участие в аукционе — данные для идентификации и проверки, только если вы подаёте заявку на участие."] },
        { id: "how-we-use", title: "Как мы используем данные", list: ["Чтобы ответить на запрос и организовать частный просмотр.", "Чтобы оценить и представить автомобиль, который вы хотите продать.", "Чтобы проверять участников и проводить закрытые аукционы.", "Чтобы выполнять требования закона, бухгалтерского учёта и противодействия отмыванию денег."] },
        { id: "legal-basis", title: "Правовые основания", paras: ["Мы обрабатываем данные, чтобы по вашей просьбе подготовить договор, исполнить договор с вами, выполнить требования закона и — чтобы сообщать о похожих автомобилях — на основании нашего законного интереса или вашего согласия, которое можно отозвать в любой момент."] },
        { id: "sharing", title: "Передача данных", paras: ["Конфиденциальность — основа нашего сервиса. Мы никогда не продаём ваши данные. Мы передаём их только тем, без кого невозможно завершить сделку, — партнёрам по осмотру, логистическим компаниям, платёжным организациям или государственным органам — и только в минимально необходимом объёме."] },
        { id: "retention", title: "Хранение", paras: ["Запросы, не завершившиеся сделкой, удаляются в течение 24 месяцев. Документы по сделкам хранятся в сроки, установленные налоговым и бухгалтерским законодательством."] },
        { id: "cookies", title: "Cookie и локальное хранилище", paras: ["Сайт не использует рекламные или отслеживающие cookie. Выбранный язык запоминается в небольшом cookie, а браузер хранит одну отметку только на время визита — было ли уже показано вступление, — чтобы оно не повторялось на каждой странице. Заявки из форм передаются нашей команде через Telegram."] },
        { id: "your-rights", title: "Ваши права", paras: ["Вы можете запросить доступ к данным, их исправление или удаление, ограничить обработку или возразить против неё, а также получить копию в переносимом формате. Вы вправе подать жалобу в национальный орган по защите данных. Чтобы воспользоваться правами, свяжитесь с нами — мы ответим в течение 30 дней."] },
        { id: "security", title: "Безопасность", paras: ["Доступ к данным клиентов есть только у сотрудников, которые ведут ваш запрос. Мы используем защищённые соединения и надёжных поставщиков для хранения информации."] },
        { id: "changes", title: "Изменения политики", paras: ["Мы можем время от времени обновлять эту политику. Дата вверху страницы указывает актуальную версию."] },
      ],
    },
    terms: {
      intro: "Понятные правила для конфиденциального сервиса. Пожалуйста, ознакомьтесь с ними до отправки запроса или участия в аукционе.",
      sections: [
        { id: "acceptance", title: "Принятие условий", paras: ["Пользуясь сайтом, вы соглашаетесь с этими условиями. Если вы не согласны, пожалуйста, не используйте сайт. К любой покупке, продаже, комиссии или аукциону применяются отдельные письменные договоры."] },
        { id: "information", title: "Информация об автомобилях", paras: ["Автомобили, характеристики и изображения приводятся для ознакомления и не являются публичной офертой. Наличие, состояние и цена подтверждаются письменно до заключения сделки. Изображения могут быть иллюстративными."] },
        { id: "enquiries", title: "Запросы и частные просмотры", paras: ["Отправка запроса не создаёт обязательств ни для одной из сторон. Частные просмотры проводятся по записи и могут требовать подтверждения личности."] },
        { id: "selling", title: "Продажа автомобиля", paras: ["Отправляя автомобиль, вы подтверждаете, что являетесь его владельцем или имеете право на продажу, а предоставленные сведения и фото достоверны. Любая оценка предварительна до подтверждения осмотром."] },
        { id: "auctions", title: "Закрытые аукционы", paras: ["Аукционы проводятся только по приглашению. Участие, ставки, резервные цены, комиссии и условия оплаты определяются условиями аукциона, которые получают проверенные участники. Таймеры на сайте носят ориентировочный характер."] },
        { id: "ip", title: "Интеллектуальная собственность", paras: ["Название VAULT, логотип, тексты, дизайн и изображения сайта принадлежат VAULT или его лицензиарам и не могут копироваться или использоваться без письменного разрешения. Автомобильные марки и товарные знаки принадлежат их владельцам."] },
        { id: "liability", title: "Ответственность", paras: ["Мы стараемся поддерживать сайт точным и доступным, но не гарантируем отсутствие ошибок или перебоев. В пределах, допустимых законом, VAULT не несёт ответственности за косвенные убытки, связанные с использованием сайта."] },
        { id: "links", title: "Ссылки на сторонние сервисы", paras: ["Ссылки на внешние сервисы, такие как WhatsApp, Instagram, YouTube или Telegram, приводятся для удобства. На них распространяются их собственные условия и политики конфиденциальности."] },
        { id: "law", title: "Применимое право", paras: ["Эти условия регулируются законодательством страны регистрации VAULT. Споры сначала решаются путём переговоров, а при недостижении согласия — компетентными судами этой юрисдикции."] },
        { id: "changes", title: "Изменения", paras: ["Мы можем обновлять эти условия. Продолжая пользоваться сайтом после обновления, вы принимаете новую редакцию."] },
      ],
    },
  },
};

export const updatedOn: Record<Locale, string> = { en: "October 1, 2026", ro: "1 octombrie 2026", ru: "1 октября 2026" };
