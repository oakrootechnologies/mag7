# Mag7 Global Website - Next.js Clone of Ezyly Exim

This is a premium, fully responsive **Next.js (App Router) + Tailwind CSS + TypeScript** clone of `ezylyexim.com`, custom-branded for **Mag7 Global**.

## Technologies Used
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (custom brand color palette matching the original design scheme)
- **Icons:** Lucide React
- **Animations:** Framer Motion (ready for rich transitions and scroll animations)
- **Data Sourcing:** Structured local database containing all 30+ products (fruits, vegetables, spices, grains, and imports) with exact export specifications.

---

## Folder Structure
All components and pages have been written directly to the workspace:
- `/src/app/globals.css` - Custom styles, transitions, Barlow Google Font, and infiniteRates marquee animation.
- `/src/app/layout.tsx` - App layout with the header marquee tracker showing live Nashik onion, banana, and ocean freight rates.
- `/src/app/page.tsx` - Interactive home page with banner sliders, map tags, categories filter, and enquiry trigger.
- `/src/app/about-us/page.tsx` - About us page describing sourcing pipeline and local offices.
- `/src/app/export-products/page.tsx` - Searchable catalog with category sidebar tabs.
- `/src/app/export-products/[slug]/page.tsx` - Dynamic product details rendering specs matrices and step-by-step export timeline.
- `/src/app/certificates/page.tsx` - Registrations overview (FSSAI, APEDA, Import-Export Code).
- `/src/app/contact-us/page.tsx` - Validation form alongside location contacts.
- `/src/components/` - Navbar, Footer, and the shared responsive EnquiryModal.
- `/src/data/products.ts` - High-quality agricultural database containing specs and Unsplash image assets.

---

## How to Run Locally

Since background terminal command execution is restricted in this development agent's workspace environment due to local OS permissions, please run the following commands in your own shell:

1. **Navigate to the project directory:**
   ```bash
   cd "d:\Codes\ORT Projects\mag7global"
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   - [http://localhost:3000](http://localhost:3000)

---

## Build for Production
To build the site and verify production bundle compilation:
```bash
npm run build
```
This compile check will generate a static optimized bundle under the `.next` directory.
