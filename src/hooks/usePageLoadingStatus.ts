import { useEffect, useState } from "react";

export function usePageLoadingStatus() {
  const [shouldShow, setShouldShow] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Check if we should show loader at all
  useEffect(() => {
    const allImages = Array.from(document.images);
    const nonLazyImages = allImages.filter((img) => img.loading !== "lazy");
    const uncachedImages = nonLazyImages.filter((img) => !img.complete);
    const fontsLoading = document.fonts?.status === "loading";

    console.log("[usePageLoadingStatus] Images:", {
      total: allImages.length,
      nonLazy: nonLazyImages.length,
      uncached: uncachedImages.length,
    });
    console.log("[usePageLoadingStatus] Fonts status:", document.fonts?.status);

    if (uncachedImages.length > 0 || fontsLoading) {
      console.log("[usePageLoadingStatus] Should show loader");
      setShouldShow(true);
    } else {
      console.log("[usePageLoadingStatus] Everything cached, skipping loader");
    }
  }, []);

  // Check DOM ready
  useEffect(() => {
    if (!shouldShow) return;

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      console.log("[usePageLoadingStatus] DOM already ready");
      setDomReady(true);
    } else {
      const handler = () => {
        console.log("[usePageLoadingStatus] DOM ready");
        setDomReady(true);
      };
      document.addEventListener("DOMContentLoaded", handler);
      return () => document.removeEventListener("DOMContentLoaded", handler);
    }
  }, [shouldShow]);

  // Check images
  useEffect(() => {
    if (!shouldShow) return;

    const checkImages = () => {
      const images = Array.from(document.images).filter(
        (img) => img.loading !== "lazy"
      );

      if (images.length === 0) {
        console.log("[usePageLoadingStatus] No images to load");
        setImagesLoaded(true);
        return;
      }

      let loaded = 0;
      const total = images.length;

      const onLoad = () => {
        loaded++;
        console.log(`[usePageLoadingStatus] Image loaded: ${loaded}/${total}`);
        if (loaded === total) setImagesLoaded(true);
      };

      images.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", onLoad);
          img.addEventListener("error", onLoad);
        }
      });

      if (loaded === total) {
        console.log("[usePageLoadingStatus] All images already loaded");
        setImagesLoaded(true);
      }
    };

    if (document.readyState === "complete") {
      checkImages();
    } else {
      window.addEventListener("load", checkImages);
      return () => window.removeEventListener("load", checkImages);
    }
  }, [shouldShow]);

  // Check fonts
  useEffect(() => {
    if (!shouldShow) return;

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        console.log("[usePageLoadingStatus] Fonts ready");
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }, [shouldShow]);

  return {
    shouldShow,
    domReady,
    imagesLoaded,
    fontsLoaded,
    isComplete: domReady && imagesLoaded && fontsLoaded,
  };
}
