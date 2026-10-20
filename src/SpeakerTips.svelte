<script>
  import Boids from './lib/Boids.svelte';
  import { speakFormUrl } from './lib/links.js';

  import imgVR from './assets/1758730080901.jpeg'
  import imgTwoSpeakers from './assets/1758730076939.jpeg'
  import imgAudience from './assets/1758730080993.jpeg'

  const customColors = [
    'rgba(0, 200, 106, 1)',
    'rgba(0, 170, 90, 1)',
    'rgba(30, 215, 130, 0.95)',
    'rgba(80, 225, 160, 0.9)',
  ];
</script>

<main>
    <Boids
    numBoids={800}
    numBoidsMobile={80}
    opacity={1}
    colors={customColors}
    avoidanceSelector=".boid-repel"
    avoidanceBuffer={50}
    />
  <div id='background'></div>

    <section class="header header--static">
        <h1 class="title"><a href="/" class="title-link">make~</a></h1>
        <div class="back-link"><a href="/" class="inline-link">← back to make~</a></div>
    </section>

    <section class="section section--compact">
        <div class="content">
            <h2>Speaker Tips</h2>
            <p class="section-intro">6 minutes goes fast. Here's how to make the most of it.</p>
            <div class="tips-grid">
                <div class="tip-card">
                    <span class="tip-number">01</span>
                    <h3>Pick one idea</h3>
                    <p>Don't try to cover everything. One thing, explored well, is more memorable than five things rushed.</p>
                </div>
                <div class="tip-card">
                    <span class="tip-number">02</span>
                    <h3>Show, don't explain</h3>
                    <p>A working demo beats a thousand slides. If you can show it live, show it live.</p>
                </div>
                <div class="tip-card">
                    <span class="tip-number">03</span>
                    <h3>Half-finished is fine</h3>
                    <p>You don't need a polished product. Rough edges and open questions make for better conversation afterwards.</p>
                </div>
                <div class="tip-card">
                    <span class="tip-number">04</span>
                    <h3>Time yourself once</h3>
                    <p>6 minutes is shorter than you think. Do one run-through. Cut anything that isn't essential to the point.</p>
                </div>
                <div class="tip-card">
                    <span class="tip-number">05</span>
                    <h3>Start with the thing</h3>
                    <p>Skip the preamble. Don't open with "my talk is about...". Just show it. Context follows naturally.</p>
                </div>
                <div class="tip-card">
                    <span class="tip-number">06</span>
                    <h3>Arrive 15 mins early</h3>
                    <p>We'll have HDMI and USB-C adapters. If you're demoing something live, test your setup before the room fills up.</p>
                </div>
            </div>
            <div class="tips-footer">
                <p>Slides are optional. Demos are encouraged. First-time speakers very welcome.</p>
            </div>

            <div style="margin-top: 2rem;">
                <a href={speakFormUrl} class="interactive-text" style="color: var(--primary); text-decoration: none; font-weight: 600;">→ Apply to speak here</a>
            </div>
        </div>
    </section>

    <section class="section section--compact">
        <div class="content">
            <h2>What can I talks about?</h2>

            <p>You can talk about something you made, something you're making, or just something you can't stop thinking about.</p>
            <p>We're especially excited by weird formats and strange metaphors.</p>

            <div class="event-photo-strip">
                <img src={imgVR} alt="Holly New presenting through a VR headset" />
                <img src={imgTwoSpeakers} alt="Megan Watkins and Fiona Bavinton presenting" />
                <img src={imgAudience} alt="Speaker at make~ 01" />
            </div>
            <p><em>Previously we've had...</em></p>
            <ul class="talk-list">
                <li class="interactive-text talk-item">
                    <span class="talk-star" style="color: #ff6b35;">*</span>
                    Generative music made with code
                </li>
                <li class="interactive-text talk-item">
                    <span class="talk-star" style="color: #ff4d8d;">*</span>
                    VR-native fashion deisgn, delivered entirely through a VR headset
                </li>

                <li class="interactive-text talk-item">
                    <span class="talk-star" style="color: #8b5cf6;">*</span>
                    On-the-fly urban redevelopments, shown on a 3D visualisation of the city
                </li>
                <li class="interactive-text talk-item">
                    <span class="talk-star" style="color: #facc15;">*</span>
                    AI tour guides
                </li>
                <li class="interactive-text talk-item">
                    <span class="talk-star" style="color: #38bdf8;">*</span>
                    An explorable and programmable world to teach schoolchildren computers
                </li>
                <li class="interactive-text talk-item">
                    <span class="talk-star" style="color: #fb923c;">*</span>
                    A live crafting micro-workshop
                </li>
            </ul>

            <div class="talks-note">
                <p>
                    <em>Among philosophies of open tools, speculative design concepts, faifailed side project with lessons that stuck and things someone built just to see if they could.</em>
                </p>
                <p>
                    <em>You don't need a polished pitch deck, in fact we'd rather it wasn't a pitch deck at all.</em>
                </p>
                <p>
                    <em>You just need an idea to share. Even if it's too weird, especially if it's 'too weird'.</em>
                </p>
            </div>
        </div>
    </section>
</main>
