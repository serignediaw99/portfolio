#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p public/projects/compressed

# Loop through all MP4 files in the public/projects directory
for video in public/projects/*.mp4; do
    if [ -f "$video" ]; then
        filename=$(basename "$video")
        echo "Compressing $filename..."
        
        # Get original size
        original_size=$(du -h "$video" | cut -f1)
        echo "Original size: $original_size"
        
        # Get video dimensions
        dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$video")
        width=$(echo $dimensions | cut -d'x' -f1)
        height=$(echo $dimensions | cut -d'x' -f2)
        
        # Calculate new dimensions while maintaining aspect ratio
        if [ $width -gt $height ]; then
            new_width=960
            new_height=-1
        else
            new_width=-1
            new_height=960
        fi
        
        # Check if file is still too large (over 100MB)
        if [ "$filename" = "sun_phase_viz.mp4" ]; then
            # More aggressive settings for large files
            ffmpeg -i "$video" \
                -c:v libx264 \
                -crf 28 \
                -preset slower \
                -vf "scale=$new_width:$new_height" \
                -c:a aac \
                -b:a 96k \
                -movflags +faststart \
                -y \
                "public/projects/compressed/$filename"
        else
            # Normal compression settings
            ffmpeg -i "$video" \
                -c:v libx264 \
                -crf 26 \
                -preset slower \
                -vf "scale=$new_width:$new_height" \
                -c:a aac \
                -b:a 128k \
                -movflags +faststart \
                -y \
                "public/projects/compressed/$filename"
        fi
        
        # Get compressed size
        compressed_size=$(du -h "public/projects/compressed/$filename" | cut -f1)
        echo "Compressed size: $compressed_size"
        echo "-------------------"
    fi
done

echo "Compression complete! Check the compressed videos in public/projects/compressed/" 