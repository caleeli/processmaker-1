import '../tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'

import '../ProcessMaker'
import Requests from '../../src/stories/Requests.vue'
import CounterCard from '../../src/stories/CounterCard.vue'

window.ProcessMaker.vueComponents.Requests = Requests;
window.ProcessMaker.vueComponents.CounterCard = CounterCard;
