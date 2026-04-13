<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class MediaUploadController extends Controller
{
    /**
     * Upload an image from the Lexical Editor.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = uniqid() . '_' . time() . '.webp';
            $path = 'editor/' . $filename;

            if (!Storage::disk('public')->exists('editor')) {
                Storage::disk('public')->makeDirectory('editor');
            }

            // Process image with Intervention Image V4
            $image = Image::decode($file);
            $image->scale(width: 1200); // Max width for editor images
            $image->encode(new \Intervention\Image\Encoders\WebpEncoder(quality: 80));
            $image->save(Storage::disk('public')->path($path));

            return response()->json([
                'url' => Storage::disk('public')->url($path),
            ]);
        }

        return response()->json(['error' => 'Image upload failed.'], 400);
    }
}
