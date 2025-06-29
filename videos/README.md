# Videos Folder

This folder contains video files for the website, specifically for the hero banner background.

## Hero Background Video

### File: `hero-background.mp4`

**Purpose**: Background video for the hero banner section at the top of the website.

### Video Requirements:

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9 (landscape)
- **Duration**: 10-30 seconds (loops automatically)
- **File Size**: Under 10MB for optimal loading
- **Content**: Should be subtle and not distract from text overlay

### Recommended Content:

- Slow motion violin playing
- Studio recording sessions
- Abstract musical elements
- Gentle camera movements
- Soft lighting and atmosphere

### How to Add:

1. **Replace the placeholder**: Simply replace `hero-background.mp4` with your video file
2. **Keep the filename**: Use the same filename to avoid updating HTML
3. **Optimize**: Compress the video for web using tools like HandBrake or online compressors
4. **Test**: Ensure the video loads and plays smoothly

### Fallback System:

- If the video fails to load, the background image will automatically show instead
- The system is designed to gracefully handle video loading issues
- No manual intervention required

### Alternative: Custom Filename

If you prefer a different filename, update the path in `index.html`:

```html
<source src="videos/your-video-name.mp4" type="video/mp4">
```

### Video Settings:

The video is configured with these attributes:
- `autoplay`: Starts automatically
- `muted`: No sound (required for autoplay)
- `loop`: Repeats continuously
- `playsinline`: Plays inline on mobile devices

### Performance Tips:

1. **Compress**: Use web-optimized compression
2. **Short duration**: 10-30 seconds is ideal for looping
3. **Subtle content**: Avoid fast movements or bright colors
4. **Mobile friendly**: Ensure it works well on smaller screens 