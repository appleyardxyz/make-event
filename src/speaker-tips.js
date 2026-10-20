import { mount } from 'svelte'
import './app.css'
import SpeakerTips from './SpeakerTips.svelte'

const app = mount(SpeakerTips, {
  target: document.getElementById('app'),
})

export default app
