<script context="module">
  export const defaultTicketUrl = "https://luma.com/qyimx88z";
  export const defaultEventDate = "Tuesday 10th November 2026";
  // e.g. "Tuesday 10th November 2026" -> "10 Nov 2026"
  export const defaultEventDateShort = defaultEventDate
    .replace(/^\w+\s+/, '')
    .replace(/(\d+)(st|nd|rd|th)/, '$1')
    .replace(/([A-Za-z]{3})[a-z]*/, '$1');
</script>

<script>
  import { onMount, onDestroy } from 'svelte';

  export let eventTitle = "make~";
  export let eventDate = defaultEventDate;
  export let eventTime = "5:30 PM – 8:00 PM";
  export let eventDateTime = "2026-11-10T17:30:00"; // ISO format for countdown
  export let venue = "To Be Announced (Southampton/Winchester)";
    let countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  /**
     * @type {number | undefined}
     */
  let interval;

  export let location = "To Be Announced";
  export let format = "6 × 6min talks";
  export let price = "Free";
  export let eventbriteUrl = defaultTicketUrl;
  export let perks = [
    "6 creative tech flash talks",
    "Networking with local makers & creatives", 
    "Light refreshments & drinks",
  ];
  let mapsUrl = "";
    function updateCountdown() {
    const now = new Date().getTime();
    const eventTime = new Date(eventDateTime).getTime();
    const difference = eventTime - now;
    
    if (difference > 0) {
      countdown = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    } else {
      countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }
    onMount(() => {
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
  });
  function openTickets() {
    window.open(eventbriteUrl, '_blank');
  }
  function openDirections() {
    window.open(mapsUrl, '_blank');
  }
</script>

<div class="ticket-section">
  <div class="ticket-card">
    <div class="ticket-header">
      <h3 class="ticket-title">{eventTitle}</h3>
      
      <p class="ticket-date">{eventDate}</p>
            <div class="countdown">
          <div class="countdown-item">
            <span class="countdown-number">{countdown.days}</span>
            <span class="countdown-label">days</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">{countdown.hours}</span>
            <span class="countdown-label">hrs</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">{countdown.minutes}</span>
            <span class="countdown-label">min</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">{countdown.seconds}</span>
            <span class="countdown-label">sec</span>
          </div>
        </div>
    </div>
    
    <div class="ticket-details">
      <div class="ticket-detail">
        <span class="detail-label">Time</span>
        <span class="detail-value">{eventTime}</span>
      </div>
      <div class="ticket-detail">
        <span class="detail-label">Venue</span>
        <span class="detail-value">{venue}</span>
      </div>
      <div class="ticket-detail">
        <span class="detail-label">Format</span>
        <span class="detail-value">{format}</span>
      </div>
      <div class="ticket-detail">
        <span class="detail-label">Location</span>
        <span class="detail-value">{location}</span>
      </div>
    </div>
    
    <div class="ticket-price">
      <p class="price-label">Ticket Price</p>
      <p class="price-value">{price}</p>
    <div class="availability">
      <p class="availability-text">Limited seats available • Book now</p>
    </div>
    </div>
    
    <button class="eventbrite-btn" on:click={openTickets}>
      Get Tickets Now
    </button>
    <button class="directions-btn" on:click={openDirections}>
      📍 Get Directions
    </button>
    <div class="ticket-perks">
      <p class="perks-title">What's Included</p>
      <ul class="perks-list">
        {#each perks as perk}
          <li class="perk-item">
            <span class="perk-icon">✓</span>
            {perk}
          </li>
        {/each}
      </ul>
    </div>
    

  </div>
</div>

<style>
  :global(:root) {
    --primary: #00ff88;
    --secondary: #ff6b35;
    --accent: #8b5cf6;
    --bg: #0a0a0a;
    --text: #f0f0f0;
    --text-dim: #a3a3a3;
    --card-bg: rgba(255, 255, 255, 0.04);
    --border: rgba(255, 255, 255, 0.08);
  }

  .ticket-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin: 2rem 0;
  }

  .ticket-card {
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.55) 45%, rgba(0, 0, 0, 0) 100%);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
    max-width: 480px;
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    font-family: 'JetBrains Mono', 'Monaco', 'Menlo', monospace;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  }

  .ticket-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 255, 136, 0.15);
    border-color: rgba(0, 255, 136, 0.25);
  }

  .ticket-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent);
  }

  .ticket-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(0, 255, 136, 0.05) 0%, transparent 60%);
    pointer-events: none;
  }

  .ticket-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .ticket-title {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.25rem;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .ticket-date {
    font-size: 1.5rem;
    color: var(--text);
    font-weight: 600;
    letter-spacing: -0.02em;
    font-family: 'Inter', sans-serif;
  }

  .ticket-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  .ticket-detail {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .detail-label {
    color: var(--accent);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .detail-value {
    color: var(--text);
  }

  .ticket-price {
    text-align: center;
    margin-bottom: 2rem;
  }

  .price-label {
    font-size: 0.9rem;
    color: var(--text-dim);
    margin-bottom: 0.5rem;
  }

  .price-value {
    font-size: 2rem;
    color: var(--primary);
    font-weight: 600;
  }

  .eventbrite-btn {
    width: 100%;
    padding: 0.9rem 2rem;
    background: var(--primary);
    color: #0a0a0a;
    border: none;
    border-radius: 10px;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .eventbrite-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 255, 136, 0.35);
  }

  .eventbrite-btn:active {
    transform: translateY(0);
  }

  .directions-btn {
    width: 100%;
    padding: 0.8rem 2rem;
    background: transparent;
    color: var(--text-dim);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.75rem;
    letter-spacing: 0.5px;
  }

  .directions-btn:hover {
    color: var(--text);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }

  .ticket-perks {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }

  .perks-title {
    font-size: 0.9rem;
    color: var(--accent);
    margin-bottom: 1rem;
    text-align: center;
  }

  .perks-list {
    list-style: none;
    display: grid;
    gap: 0.5rem;
    padding: 0;
  }

  .perk-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-dim);
  }

  .perk-icon {
    width: 16px;
    height: 16px;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: var(--bg);
    flex-shrink: 0;
  }

  .availability {
    text-align: center;
    margin-top: 1rem;
  }

  .availability-text {
    font-size: 0.8rem;
    color: var(--secondary);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @media (max-width: 768px) {
    .ticket-details {
      grid-template-columns: 1fr;
    }
    
    .ticket-card {
      padding: 1.5rem;
    }
  }
  .countdown {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .countdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 255, 136, 0.04);
    border: 1px solid rgba(0, 255, 136, 0.12);
    border-radius: 10px;
    padding: 0.6rem 0.5rem;
    min-width: 54px;
  }

  .countdown-number {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .countdown-label {
    font-size: 0.65rem;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 0.3rem;
  }
</style>