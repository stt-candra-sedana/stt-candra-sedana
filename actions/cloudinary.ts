"use server";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with server-side environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Parses the Cloudinary URL to extract the public ID.
 * Example input: https://res.cloudinary.com/dvi8oy2ue/image/upload/v1717283928/events/xdfasfadf.jpg
 * Example output: events/xdfasfadf
 * If input is already a raw public ID (not a URL), it returns the input as is.
 */
function getPublicIdFromUrl(url: string): string | null {
  if (!url) return null;
  // If it's already a public_id (doesn't start with http/https and doesn't contain res.cloudinary.com)
  if (!url.startsWith("http") && !url.includes("res.cloudinary.com")) {
    return url;
  }
  
  try {
    const parts = url.split("/image/upload/");
    if (parts.length < 2) return null;
    
    let remaining = parts[1];
    
    // Remove version segment (e.g. v1234567890/)
    const versionMatch = remaining.match(/^v\d+\/(.+)$/);
    if (versionMatch) {
      remaining = versionMatch[1];
    }
    
    // Strip file extension
    const lastDotIndex = remaining.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      remaining = remaining.substring(0, lastDotIndex);
    }
    
    return remaining;
  } catch (error) {
    console.error("Error parsing Cloudinary URL:", error);
    return null;
  }
}

/**
 * Server action to delete an asset from Cloudinary using its secure URL.
 */
export async function deleteCloudinaryAsset(url: string): Promise<{ success: boolean; error?: string }> {
  if (!url) return { success: true };
  
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) {
    return { success: false, error: "Failed to parse public ID from URL" };
  }

  // Gracefully skip if server API credentials are not set
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn("Cloudinary API credentials are missing. Skipping file deletion for:", publicId);
    return { success: true };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok" || result.result === "not_found") {
      console.log(`Cloudinary asset deleted successfully: ${publicId} (${result.result})`);
      return { success: true };
    }
    return { success: false, error: result.result || "Unknown error" };
  } catch (error: any) {
    console.error(`Cloudinary deletion failed for public ID ${publicId}:`, error);
    return { success: false, error: error.message || "Request failed" };
  }
}
