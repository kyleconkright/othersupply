import { writable } from "svelte/store";

export const releases = writable([])

async function fetchRedditReleases() {
  const res = await fetch('https://www.reddit.com/r/VinylReleases/new.json');
  const data = await res.json();
  const results = data.data.children.map(release => {
    return {
      title: release.data.title.toLowerCase(),
      flair: release.data.link_flair_text,
      thumbnail: redditThumbnail(release.data.thumbnail),
      link: release.data.url_overridden_by_dest ? release.data.url_overridden_by_dest : release.data.permalink,
      id: release.data.id
    }
  });
  releases.set(results);
}

fetchRedditReleases();

function redditThumbnail(str) {
  const hasThumbnail = str !== 'self' && str !== 'default';
  return hasThumbnail ? str : undefined;
}