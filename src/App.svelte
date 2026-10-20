<script>
  import { onMount, onDestroy } from 'svelte';
  import Boids from './lib/Boids.svelte';
  import TicketCard, { defaultTicketUrl } from './lib/TicketCard.svelte';
  import BottomTicketDrawer from './lib/BottomTicketDrawer.svelte';
  import { speakFormUrl } from './lib/links.js';

  import imgNetworking from './assets/1758730076988.jpeg'
  import imgVR from './assets/1758730080901.jpeg'
  import imgTwoSpeakers from './assets/1758730076939.jpeg'
  import imgAudience from './assets/1758730080993.jpeg'

  const customColors = [
    'rgba(0, 200, 106, 1)',
    'rgba(0, 170, 90, 1)',
    'rgba(30, 215, 130, 0.95)',
    'rgba(80, 225, 160, 0.9)',
  ];

  let isHovered = false;
  var location = speakFormUrl

  let showDrawer = false;
  let observer;

  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'talks', label: 'what kinds of talks' },
    { id: 'speak', label: 'get involved' },
    { id: 'contact', label: 'contact' },
  ];
  let activeId = 'home';

  function updateActive() {
    const mid = window.innerHeight / 2;
    let current = navItems[0].id;
    let best = -Infinity;
    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= mid && top > best) {
        best = top;
        current = id;
      }
    }
    activeId = current;
  }

  onMount(() => {
    updateActive();
    const aboutEl = document.querySelector('#about');
    observer = new IntersectionObserver(
      ([entry]) => { showDrawer = !entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (aboutEl) observer.observe(aboutEl);
  });

  onDestroy(() => {
    if (observer) observer.disconnect();
  });
</script>

<svelte:window on:scroll={updateActive} on:resize={updateActive} />

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
      <div class="url-display mono">
        <span role="button" tabindex="0" on:click={()=>window.location=location} on:keydown={(e)=>{ if (e.key === 'Enter' || e.key === ' ') window.location=location; }} id="url-text">~ Creative Catalyst Tech Talks ~</span>
    </div>
    <nav class="nav">
        {#each navItems as item}
            <a href="#{item.id}" class="nav-item" class:active={activeId === item.id}>{item.label}</a>
        {/each}
    </nav>
    <section id="home" class="header">
        <h1 class="title" class:boid-repel={isHovered} on:mouseenter={() => isHovered = true} on:mouseleave={() => isHovered = false}><a href="/" class="title-link">make~</a></h1>
        <p class="subtitle">creative tech flash talks in southampton</p>
    </section>

    <section id="about" class="section">
        <div class="about-inner">
            <div class="content">
                <h2>What is make~?</h2>
                <p><strong>make~ is an evening of flash talks about creative technology, tools, ideas, and unfinished projects.</strong></p>
                <p>It's for artists, designers, hackers, programmers, students, tinkerers and writers. Basically, anyone who wants to share something they've made, thought about, or can't stop tinkering with.</p>
                <p class="interactive-text">6 speakers. 6 minutes each. Then time for drinks, food and idea sharing</p>
            </div>
            <div class="about-ticket">
                <TicketCard/>
            </div>
        </div>
    </section>

    <section id="talks" class="section">
        <div class="content">
            <h2>What kinds of talks?</h2>
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
                    <em>Among philosophies of open tools, speculative design concepts, failed side project with lessons that stuck and things someone built just to see if they could.</em>
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

    <section id="speak" class="section">
        <div class="content">
            <h2>Want to come?</h2>
            <p>make~ is and always will be a free event, we ask everyone gets a ticket so we know how many are coming and much pizza to order.</p>
            <a href={defaultTicketUrl} target="_blank" rel="noopener noreferrer" class="interactive-text" style="color: var(--primary); text-decoration: none; font-weight: 600;">→ Get a ticket</a>

            <div class="event-hero">
                <img src={imgNetworking} alt="People talking and networking at make~ 01" />
            </div>

            <h2>Want to speak?</h2>
            <p>We'd love that. You can talk about something you made, something you're making, or just something you can't stop thinking about.</p>
            <p>We're especially excited by first-time speakers, weird formats, and strange metaphors.</p>
            <p>We also recommend you look at our <a href="/speaker-tips" class="inline-link">speaker's tips</a>.</p>

            <div style="margin-top: 2rem;">
                <a href="{location}" class="interactive-text" style="color: var(--primary); text-decoration: none; font-weight: 600;">→ Apply to speak here</a>
            </div>
        </div>
    </section>
    <section id="contact" class="section">
        <div class="content">
            <h2>Contact</h2>
            <p>Want to sponsor, provide drinks or just have some questions, email us!</p>
            <a class="contact-link" href="mailto:damianbemben@geochip.uk"> Damian Bemben | damianbemben@geochip.uk</a>
            <br>
            <br>
            <a class="contact-link" href="mailto:damianbemben@geochip.uk"> Tam Appleyard | appleyard@tuta.io</a>
        </div>
    </section>

  <BottomTicketDrawer visible={showDrawer} />
</main>
