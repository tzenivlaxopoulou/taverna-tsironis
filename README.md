# Ταβέρνα Τσιρώνης - Static one-page website

Στατική, responsive ιστοσελίδα παρουσίασης για την «Ταβέρνα Τσιρώνης» στη Σωτήρα Τρικάλων.

## Πώς ανοίγει το site τοπικά

Η σελίδα δεν χρειάζεται framework ή build step.

1. Ανοίξτε το `index.html` απευθείας στον browser.
2. Εναλλακτικά, από τον φάκελο του project:

```bash
python3 -m http.server 8000
```

και μετά ανοίξτε:

```text
http://localhost:8000
```

## Στοιχεία πελάτη που έχουν περαστεί

- Διεύθυνση: Δημοκρατίας 28, Σωτήρα 421 00, Τρίκαλα.
- Τηλέφωνα: `2431 074796`, `693 900 6648`.
- Email: `Tsironistavern@gmail.com`.
- Υπεύθυνος: Λευτέρης Ντάνας.
- Ωράριο λειτουργίας ανά ημέρα.
- Google Maps link.
- Facebook link.
- Φαγητό σε πακέτο και τροφοδοσία για γάμους, βαπτίσεις, γενέθλια και κοινωνικές εκδηλώσεις.

## Στοιχεία που μένουν για live ανέβασμα

- Τελικό canonical URL.
- Απόλυτα Open Graph URLs.
- `priceRange`, μόνο αν επιβεβαιωθεί.
- Instagram δεν δόθηκε και δεν εμφανίζεται στο site.

Τα canonical / Open Graph live URLs παραμένουν pending μέχρι να υπάρξει τελικό domain.

## Πού μπαίνουν νέες φωτογραφίες

- Φωτογραφίες φαγητών: `photos/foods`
- Φωτογραφίες χώρου/εσωτερικού: `photos/esoteriko`

Υποστηρίζονται static paths για `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Για να εμφανιστούν νέες φωτογραφίες στο site, προσθέστε νέο gallery item στο `index.html` με το σωστό relative path, alt text και `loading="lazy"`.

## Τι αλλαγές έγιναν

- Δημιουργήθηκε semantic one-page `index.html`.
- Προστέθηκε responsive CSS στο `assets/css/styles.css`.
- Προστέθηκε vanilla JavaScript στο `assets/js/main.js`.
- Υλοποιήθηκαν sticky header, mobile navigation, smooth scroll, active nav links, gallery filters και lightbox.
- Προστέθηκαν SEO basics, Open Graph tags και JSON-LD τύπου `Restaurant`.
- Χρησιμοποιήθηκαν πραγματικές φωτογραφίες από `photos/foods` και `photos/esoteriko`.
- Προστέθηκε sticky bottom CTA για κινητά.
- Προστέθηκαν accessibility basics: skip link, alt texts, aria labels, visible focus states και keyboard-friendly lightbox.

## Phase 2 notes

- Τα CTA links είχαν κρατηθεί προσωρινά ασφαλή μέχρι να δοθούν πραγματικά στοιχεία.
- Το JSON-LD είχε κρατηθεί μόνο με ασφαλή πεδία μέχρι την επιβεβαίωση των business data.
- Τα live URLs για canonical, Open Graph image και Open Graph URL πρέπει να αντικατασταθούν πριν το ανέβασμα.

## Phase 4 notes

- Περάστηκαν τα πραγματικά στοιχεία επικοινωνίας, τα `tel:` links, το `mailto:`, το Google Maps link και το ωράριο.
- Περάστηκε μόνο το Facebook link. Instagram δεν δόθηκε και δεν εμφανίζεται.
- Προστέθηκε section `#reviews` με 8 curated positive Google review excerpts.
- Το JSON-LD `Restaurant` ενημερώθηκε με επιβεβαιωμένα στοιχεία, χωρίς placeholder τιμές.
- Τα canonical / Open Graph live URLs παραμένουν pending μέχρι να δοθεί τελικό domain.
- Δεν έγινε commit.

## Compliance checklist

- Καλύπτεται αρχική σελίδα παρουσίασης.
- Καλύπτεται παρουσίαση επιχείρησης.
- Καλύπτεται παρουσίαση γεύσεων και υπηρεσιών.
- Υπάρχει άμεση κλήση με `tel:` links.
- Υπάρχει σύνδεση με Google Maps.
- Υπάρχει σύνδεση με Facebook.
- Το site είναι mobile responsive.

## Phase 6 bilingual notes

- Προστέθηκε English version στο `en/index.html`.
- Η ελληνική σελίδα παραμένει στο `index.html`.
- Προστέθηκε language switcher `EL / EN` στο navbar.
- Οι δύο γλώσσες μοιράζονται το ίδιο CSS, JavaScript και photos folder.
- Τα canonical / Open Graph live URLs παραμένουν pending μέχρι να δοθεί τελικό domain.
- Δεν έγινε commit.
