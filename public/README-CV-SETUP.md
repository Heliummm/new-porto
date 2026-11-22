# 📄 CV Setup Instructions

## Current Status
Your portfolio currently uses a **web-based HTML CV placeholder** (`/public/cv.html`).

## ✅ How to Add Your Real PDF Resume

### Option 1: Replace with Your PDF (Recommended)

1. **Export your CV as PDF**
   - Use your preferred tool (Word, Google Docs, Canva, LaTeX, etc.)
   - Ensure filename is clean and professional
   - Recommended name: `cv-daffa-aldyananta.pdf` or `resume-daffa.pdf`

2. **Place PDF in /public folder**
   ```
   /public
   ├── cv.html (old - can delete after)
   ├── cv-daffa-aldyananta.pdf  ← Your new PDF here
   ├── favicon.svg
   └── ...
   ```

3. **Update config file**
   
   Open: `src/config/site.js`
   
   Change:
   ```js
   cvUrl: "/cv.html",  // ← OLD
   ```
   
   To:
   ```js
   cvUrl: "/cv-daffa-aldyananta.pdf",  // ← NEW
   ```

4. **Test it**
   - Visit your portfolio
   - Click "Download CV" button in Hero section
   - Verify PDF downloads correctly
   - ✅ Done!

### Option 2: Use Current HTML CV

The HTML placeholder is **print-to-PDF friendly**:

1. Visit: `http://localhost:5173/cv.html`
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Choose "Save as PDF"
4. This gives you a quick PDF without extra tools

**But it's better to create a properly designed CV for professional applications.**

---

## 🎨 CV Design Tips

### For Maximum ATS Compatibility:
- Use simple, clean layouts
- Avoid complex graphics or columns
- Use standard fonts (Arial, Calibri, Times New Roman)
- Include keywords from job descriptions
- Save as `.pdf` (not `.doc` or `.docx`)

### Design Tools:
- **Free**: Google Docs, Canva (free templates), Overleaf (LaTeX)
- **Paid**: Adobe InDesign, Figma (design first), Microsoft Word
- **Developer-friendly**: JSON Resume, HackMyResume, FlowCV

---

## 📌 Important Notes

1. **File size**: Keep PDF under 2MB for fast loading
2. **Filename**: Use lowercase, hyphens (not spaces): `cv-name.pdf` ✅ not `CV Name.pdf` ❌
3. **Privacy**: Don't include sensitive info (full address, ID numbers, etc.)
4. **Update regularly**: Keep CV synced with your portfolio projects
5. **Multiple versions**: Consider having:
   - `cv-general.pdf` - for general applications
   - `cv-frontend.pdf` - frontend-focused roles
   - `cv-backend.pdf` - backend-focused roles

---

## ⚡ Quick Checklist

- [ ] CV exported as PDF
- [ ] PDF placed in `/public` folder
- [ ] `cvUrl` updated in `src/config/site.js`
- [ ] Tested download button works
- [ ] File size < 2MB
- [ ] Filename uses hyphens, lowercase
- [ ] Contact info matches portfolio config

---

## 🔗 External Hosting (Optional)

You can also host PDF externally:

```js
// src/config/site.js
cvUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
// or
cvUrl: "https://www.dropbox.com/s/YOUR_LINK/cv.pdf?dl=1",
```

**Pros**: Easy updates, no re-deploy needed
**Cons**: External dependency, tracking harder

---

Need help? Check the main [README.md](../README.md) for more portfolio setup instructions.
