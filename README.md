# Semantic Web Profile — Muhammad Fadli S

Website profil pribadi berbasis prinsip Semantic Web: ontology OWL (Protégé) → JSON-LD (schema.org) → Linked Data (DBpedia/Wikidata).

## Struktur
- `ontology.ttl` — ontology OWL (Person, University, HighSchool, Organization, Skill, Project, Event) + koneksi ke schema.org & DBpedia.
- `index.html` — halaman utama, berisi JSON-LD di `<head>`.
- `css/style.css` — styling.
- `js/script.js` — interaksi (menu mobile, toggle JSON-LD).

## Cara jalankan lokal
Buka `index.html` di browser, atau jalankan Live Server di VS Code.

## Cara deploy
1. `git init && git add . && git commit -m "init"`
2. Push ke repo GitHub.
3. Settings → Pages → branch `main`, folder root.

## Validasi
- https://validator.schema.org — cek JSON-LD.
- https://search.google.com/test/rich-results — cek rich result.

## Relasi semantik (SPO)
| Subject | Predicate | Object |
|---|---|---|
| Fadli | studiesAt | Universitas Halu Oleo |
| Fadli | graduatedFrom | SMK Negeri 4 Kendari |
| Fadli | memberOf | HIMATIF |
| Fadli | hasSkill | HTML, CSS, PHP |
| Fadli | worksOn | Portofolio Website Semantic Web |
| Fadli | participatesIn | Seminar Teknologi Informasi |