# Images Folder Structure

This folder contains all the images for Leonardo Padovani's website, organized by section.

## Folder Structure

```
images/
├── home-studio/          # Home Studio section images
│   ├── studio-1.png      # ✅ Added by user
│   ├── studio-2.png      # ✅ Added by user
│   └── studio-3.png      # ✅ Added by user
├── live-dj/              # Live Violin + DJ section images
│   ├── live-1.jpg
│   ├── live-2.jpg
│   └── live-3.jpg
└── weddings/             # Weddings section images
    ├── wedding-1.jpg
    ├── wedding-2.jpg
    └── wedding-3.jpg
```

## Image Requirements

### Recommended Specifications:
- **Format**: JPG, PNG, or WebP (PNG recommended for images with transparency)
- **Dimensions**: 400x300 pixels (minimum)
- **Aspect Ratio**: 4:3 (landscape)
- **File Size**: Under 500KB per image for optimal loading
- **Quality**: High quality, professional photos

### Image Content Suggestions:

#### Home Studio Section (`home-studio/`) ✅ **COMPLETED**
- Studio equipment setup
- Recording sessions
- Violin close-ups
- Studio environment

#### Live Violin + DJ Section (`live-dj/`)
- Live performance shots
- Stage setups
- Crowd reactions
- Performance moments

#### Weddings Section (`weddings/`)
- Wedding ceremony performances
- Romantic settings
- Elegant violin moments
- Wedding reception performances

## How to Add Images

1. **Replace Placeholder Files**: Simply replace the `.jpg` files in each folder with your actual images
2. **Keep File Names**: Maintain the same file names (studio-1.png, live-1.jpg, etc.) to avoid updating HTML
3. **Optimize Images**: Use tools like TinyPNG or ImageOptim to compress images for web
4. **Test Responsiveness**: Ensure images look good on mobile devices

## Alternative: Custom File Names

If you prefer different file names, update the corresponding paths in `index.html`:

```html
<!-- Example: If you rename studio-1.png to recording-session.png -->
<img src="images/home-studio/recording-session.png" alt="Studio Recording 1" class="gallery-img">
```

## Logo Image

The logo image is referenced in the header. You can replace it by:
1. Adding your logo to the root `images/` folder
2. Updating the path in `index.html` line 15:
   ```html
   <img src="images/your-logo.png" alt="Leonardo Padovani Logo">
   ```

## Current Status

- ✅ **Home Studio Section**: PNG images added and working
- ⏳ **Live DJ Section**: Ready for images
- ⏳ **Weddings Section**: Ready for images
- ⏳ **Logo**: Ready for custom logo 