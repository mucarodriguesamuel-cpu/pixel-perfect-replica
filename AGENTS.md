<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Keep the single Google Ads gtag.js loader and consent defaults in the root route head; keep consent updates in GoogleAdsConsent and client-side page views in the root component, so every direct route and internal navigation is measured without duplicate loaders.

Reuse one BookingExperience for the home booking section and /agendar so reservation behavior stays identical in both locations.
