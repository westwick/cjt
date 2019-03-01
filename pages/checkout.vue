<template>
  <div class="checkout">
    <div class="container" v-if="tour">
      <div class="columns">
        <div class="column is-5 is-offset-1 is-6-tablet">
          <h1>Tour Details</h1>
          <div class="checkout-card">
            <div class="field">
              <label class="label">Guests</label>
              <div class="dropdown" :class="{ 'is-active': dropdownActive }">
                <div class="dropdown-trigger" @click.stop="toggleDropdown()" @blur="hideDropdown">
                  <button class="button ddbutton" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{{ totalGuests }} {{ totalGuests > 1 ? 'Guests' : 'Guest'}}</span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu" @click.stop="() => {}">
                  <div class="dropdown-content">
                    <div class="dropdown-item ticket-selection" v-for="ticket in tickets" :key="ticket.label">
                      <div class="ticket-info">
                        <p class="ticket-type">
                          {{ ticket.label }}
                        </p>
                        <p class="ticket-description" v-if="ticket.description">
                          {{ ticket.description }}
                        </p>
                      </div>
                      <div class="ticket-stepper">
                        <div class="ticker-subtract"
                          @click="removeGuest(ticket)"
                          :class="{ 'disabled': ticket.qty <= 0 || totalGuests === 1 }"
                        >
                          &mdash;
                        </div>
                        <div class="ticker-count">{{ ticket.qty }}</div>
                        <div class="ticker-add" @click="addGuest(ticket)">+</div>
                      </div>
                    </div>
                    <div class="dropdown-item">
                      <p>Some ticket notes or whatever?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-7">
                <div class="field">
                  <label class="label">Tour Date</label>
                  <div class="control has-icons-left">
                    <date-pick v-model="date" 
                      :isDateDisabled="isDateDisabled"
                      :inputAttributes="{readonly: true, class: datePickClass, placeholder: 'Select a date'}" 
                      :displayFormat="dateFormat"
                      :parseDate="parseDate"
                      :formatDate="formatDate"
                      :startWeekOnSunday="true"
                    ></date-pick>
                    <span class="icon is-left">
                      <i class="icon icon-calendar"></i>
                    </span>
                    <p class="error help" v-if="$v.date.$dirty && !$v.date.required">* Date is required</p>
                  </div>
                </div>
              </div>
              <div class="column is-5">
                <div class="field">
                  <label class="label">Start Time</label>
                  <div class="select">
                    <select v-model="time">
                      <option value="10:30 am">10:30 am</option>
                      <option value="1:30 pm">1:30 pm</option>
                    </select>
                  </div>
                  <!--
                  <div class="control">
                    <input class="input" type="text" v-model="time" disabled="disabled">
                  </div>-->
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label optional">Pickup Location <span>(optional)</span></label>
              <div class="control">
                <input class="input" type="text" placeholder="Hotel or address" v-model="pickup">
              </div>
              <span class="help pickup-help">
                You can leave this blank and let us know later.
                <a href="#" class="visitor-center" @click.prevent.stop="toggleVc()">Coming up for the day?</a>
                <div class="vc-info" v-if="showVcInfo" @click.stop="() => {}">
                  <p>Our default pickup location is the Santa Barbara Visitor's Center, located at:</p>
                  <address>
                    1 Garden St.<br />
                    Santa Barbara, CA 93101
                  </address>
                  <p>Would you like to meet there?</p>
                  <div class="buttons are-small">
                    <button class="button is-outlined" @click="showVcInfo = false">Cancel</button>
                    <button class="button is-link" @click="setVcPickup()">Yes, set as pickup</button>
                  </div>
                </div>
              </span>
            </div>
          </div>

          <h1 class="guest-info">Guest Information</h1>
          <div class="checkout-card">
            <div class="field">
              <label class="label">First &amp; Last Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Jane Smith" v-model="guestname"
                  :class="{ 'is-danger': $v.guestname.$dirty && $v.guestname.$anyError }" maxlength="30">
                <p class="error help" v-if="$v.guestname.$dirty && !$v.guestname.required">* Name is required</p>
                <p class="error help" v-if="$v.guestname.$dirty && (!$v.guestname.minLength || !$v.guestname.maxLength)">
                  * Name must be between 3 and 30 characters
                </p>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Email Address</label>
                <input class="input" type="email" placeholder="example@email.com" v-model="email"
                  :class="{ 'is-danger': $v.email.$dirty && $v.email.$anyError }" maxlength="30">
                <p class="help">We will send you a confirmation email with more information about your tour.</p>
                <p class="error help" v-if="$v.email.$dirty && !$v.email.required">* Email is required</p>
                <p class="error help" v-if="$v.email.$dirty && !$v.email.email">* Invalid email</p>
                <p class="error help" v-if="$v.email.$dirty && !$v.email.maxLength">* Email max length is 30 characters</p>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">Phone Number</label>
                <input class="input" type="email" placeholder="310-555-1234" v-model="phone"
                  :class="{ 'is-danger': $v.phone.$dirty && $v.phone.$anyError }">
                <p class="help">Your guide will call you when they are on the way to pick you up.</p>
                <p class="error help" v-if="$v.phone.$dirty && !$v.phone.required">* Phone number is required</p>
                <p class="error help" v-if="$v.email.$dirty && !$v.phone.validPhone">* Invalid phone number</p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4 is-offset-1">
          <h1>Summary</h1>
          <div class="checkout-summary checkout-card">
            <img class="tour-thumbnail" :src="tour.thumbnail" />
            <h2>{{ tour.title | noBreak }}</h2>
            <p class="datetime"><i class="icon-calendar"></i> {{ date | dateDisplay }}</p>
            <p class="datetime time"><i class="icon-time"></i> {{ time }}</p>
            <hr />
            <p>Payment Summary</p>
            <p class="line-item" v-for="ticket in ticketsWithQty" :key="ticket.label">
              {{ ticket.qty }} {{ ticket.qty > 1 ? 'guests' : 'guest' }} @ ${{ ticket.price | priceFormat }}
              <span>${{ ticket.price * ticket.qty | priceFormat }}</span>
            </p>
            <p class="line-item">Booking fee <span>${{ bookingFee | priceFormat }}</span></p>
            <p class="line-item total">Total <span>${{ totalPrice | priceFormat }}</span></p>
            <button class="button book" @click="bookTour()" :disabled="$v.$dirty && $v.$anyError">Continue to Payment</button>
            <span class="help error" v-if="$v.$dirty && !$v.termsAgreed.agreed">
              * You must agree to the terms to continue
            </span>
            <p>
              <input type="checkbox" id="terms" v-model="termsAgreed" />
              <label for="terms" class="terms">I have read and agree to the <a href="#">terms and conditions</a></label>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-5 is-offset-1 is-6-tablet">
          <div class="assurances">
            <p>All data is sent over a secured and encrypted SSL connection.</p>
            <p>We will never sell your information to any 3rd parties.</p>
            <p>Credit card processing is managed by Stripe.com. Your payment information is never stored or transmitted by our servers.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DatePick from 'vue-date-pick';
import * as moment from 'moment';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { required, minLength, maxLength, email, sameAs, helpers } from 'vuelidate/lib/validators';
Vue.use(Vuelidate);
const validPhone = helpers.regex('validPhone', /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\s*$/);

export default {
  head() {
    return {
      script: [{ src: 'https://checkout.stripe.com/checkout.js' }],
    }
  },
  data() {
    return {
      dropdownActive: false,
      showVcInfo: false,
      guestname: 'test',
      email: 'testing@test.com',
      phone: '1231231234',
      pickup: '',
      date: '',
      time: '10:30 am',
      dateFormat: 'dddd, MMM D YYYY',
      termsAgreed: false,
      tickets: [
        {
          label: 'Adult',
          description: '$80.00 - Ages 21+',
          price: 8000,
          qty: 2
        },
        {
          label: 'Non-drinker',
          description: '$50.00',
          price: 5000,
          qty: 0
        }
      ]
    }
  },
  validations: {
    guestname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    email: {
      required,
      email,
      maxLength: maxLength(30)
    },
    phone: {
      required,
      validPhone
    },
    date: {
      required
    },
    time: {
      required
    },
    termsAgreed: {
      agreed: sameAs(() => true)
    }
  },
  components: { DatePick },
  computed: {
    ticketsWithQty() {
      return this.tickets.filter(ticket => ticket.qty > 0);
    },
    totalGuests() {
      return this.tickets.reduce((total, ticket) => total + ticket.qty, 0);
    },
    bookingFee() {
      const subtotal = this.tickets.reduce((total, ticket) => total + (ticket.qty * ticket.price), 0);
      return Math.round(subtotal * 0.115, 2);
    },
    totalPrice() {
      const subtotal = this.tickets.reduce((total, ticket) => total + (ticket.qty * ticket.price), 0);
      return subtotal + Math.round(subtotal * 0.115, 2);
    },
    tour() {
      return this.$store.state.tour;
    },
    datePickClass() {
      return this.$v.$dirty && !this.$v.date.required ? 'input is-danger' : 'input';
    }
  },
  created() {
    if (!this.tour) {
      this.$router.push({path: '/tours'});
    } else {
      document.body.addEventListener('click', this.hideDropdown);
    }
  },
  destroyed() {
    document.body.removeEventListener('click', this.hideDropdown);
  },
  filters: {
    noBreak(value) {
      const pos = value.lastIndexOf(' ');
      return value.substring(0,pos) + '\xa0' + value.substring(pos+1);
    },
    dateDisplay(value) {
      return value ? moment(value).format('dddd, MMM D') : 'Select a date';
    },
    priceFormat(value) {
      return (value / 100).toFixed(2)
    }
  },
  methods: {
    parseDate(dateString, format) {
      return moment(dateString, format).toDate();
    },
    formatDate(dateObj, format) {
      return moment(dateObj).format(format);
    },
    isDateDisabled(date) {
      const currentDate = new Date();
      return date <= currentDate;
    },
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive;
      if (this.dropdownActive) this.showVcInfo = false;
    },
    toggleVc() {
      this.showVcInfo = !this.showVcInfo;
      if (this.showVcInfo) this.dropdownActive = false;
    },
    hideDropdown(e) {
      this.dropdownActive = false;
      this.showVcInfo = false;
    },
    addGuest(ticket) {
      if (ticket.qty < 15) {
        ticket.qty++;
      }
    },
    removeGuest(ticket) {
      if (ticket.qty > 0 && this.totalGuests > 1) {
        ticket.qty--;
      }
    },
    setVcPickup() {
      this.pickup = 'Visitors Center, 1 Garden St, Santa Barbara, CA 93101';
      this.showVcInfo = false;
    },
    bookTour() {
      console.log(this.$v);
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.openStripe();
      }
    },
    openStripe() {
      if (!StripeCheckout) {
        return;
      }
      this.stripe = StripeCheckout.configure({
        key: 'pk_test_xAGAZgjFcuyzjB1CTB3v60zp',
        locale: 'auto',
        zipCode: true,
        allowRememberMe: false,
        token: (token) => {
          this.chargeCard(token.id)
        }
      });
      this.stripe.open({
        email: this.email,
        name: 'Captain Jack\'s Tours',
        description: `${this.tour.title} x${this.totalGuests}`,
        amount: this.totalPrice
      });
    },
    async chargeCard(token) {
      const hello = await axios.post('/.netlify/functions/hello', {
        token,
        amount: this.totalPrice,
        totalGuests: this.totalGuests,
        tour: this.tour,
        guest: {
          name: this.guestname,
          email: this.email,
          phone: this.phone,
          pickup: this.pickup
        }
      });
      console.log('charge card result!', hello);
    },
  }
};
</script>

<style lang="sass">
.ddbutton
  width: 320px
  justify-content: flex-start
  border: 1px solid #dbdbdb
  color: #363636
  font-weight: normal
  -moz-appearance: none
  -webkit-appearance: none
  align-items: center
  border-radius: 4px
  display: inline-flex
  font-size: 1rem
  height: 2.25em
  justify-content: flex-start
  line-height: 1.5
  padding-bottom: calc(0.375em - 1px)
  padding-left: calc(0.625em - 1px)
  padding-right: calc(0.625em - 1px)
  padding-top: calc(0.375em - 1px)
  position: relative
  vertical-align: top
  &::after
    border: 3px solid #3273dc
    right: 1.125em
    z-index: 4
    border-radius: 2px
    border-right: 0
    border-top: 0
    content: " "
    display: block
    height: 0.625em
    margin-top: -0.4375em
    pointer-events: none
    position: absolute
    top: 50%
    right: 16px
    -webkit-transform: rotate(-45deg)
    transform: rotate(-45deg)
    -webkit-transform-origin: center
    transform-origin: center
    width: 0.625em
  &:hover::after
    border-color: #363636
.checkout
  min-height: 50vh
  padding: 40px 0
  select, .select
    width: 100%
  h1
    font-size: 24px
    font-weight: bold
    margin-bottom: 8px
  .guest-info
    margin-top: 40px
  input
    font-weight: 400
  label.label
    margin-bottom: 0
  label.optional span
    font-weight: normal
    color: #6a6a6a
  .help
    font-size: .8125rem
  .help.error
    color: #ff3860
    font-weight: bold

.dropdown-menu
  width: 320px
  max-width: 320px
  padding-top: 0
  border-top: 2px solid #3273dc
  border-radius: 6px

.dropdown-content
  box-shadow: 0 0.2em 1.5em rgba(0, 0, 0, 0.06)
  border: 1px solid rgba(0, 0, 0, 0.15)

.ticket-selection
  display: flex
  justify-content: center
  align-items: center
  width: 320px
  margin-bottom: 8px
  &:last-child
    margin-bottom: 0
  .ticket-info
    display: flex
    flex-direction: column
    width: 100%
    .ticket-type
      font-weight: bold
      font-size: 18px
    .ticket-description
      font-size: 14px
      color: #787878
      margin-top: -4px
  .ticket-stepper
    font-size: 20px
    display: flex
    div
      display: flex
      width: 32px
      height: 32px
      text-align: center
      align-items: center
      justify-content: center
    .ticker-count
      font-weight: bold
      margin: 0 8px
    .ticker-add, .ticker-subtract
      cursor: pointer
      border: 1px solid #3273dc
      color: #3273dc
      border-radius: 100%
      -webkit-user-select: none
      -moz-user-select: none
      &.disabled
        opacity: 0.4
        cursor: not-allowed

.pickup-help
  position: relative
  display: inline-block
.vc-info
  width: 300px
  background: #fff
  border-radius: 6px
  padding: 16px
  box-shadow: 0 0.2em 1.5em rgba(0, 0, 0, 0.06)
  border: 1px solid rgba(0, 0, 0, 0.15)
  position: absolute
  right: 0
  z-index: 998
  address
    padding: 8px 0
  .buttons
    margin-top: 16px
    display: flex
    justify-content: flex-end
    .button
      padding-bottom: calc(.375em - 1px)
      padding-left: .75em
      padding-right: .75em
      padding-top: calc(.375em - 1px)
      &.is-outlined
        border: 1px solid #dbdbdb
        color: #6a6a6a
        margin-right: 8px

.checkout-card
  background: #fff
  padding: 24px
  border: 1px solid #e8e8e8
  border-radius: 6px
.checkout-summary
  img.tour-thumbnail
    width: 40%
    padding-left: 8px
    float: right
    margin-bottom: 16px
  div.ccs
    text-align: center
    padding: 8px 0
  img.ccs
    height: 40px
    width: auto
    margin: auto
  hr
    clear: both
    margin: 8px 0
  h2
    font-weight: bold
    margin-bottom: 8px
  .datetime
    color: #787878
    font-size: 16px
    i
      position: relative
      top: 1px
      font-size: 14px
      margin-right: 4px
    &.time
      margin-top: 4px
  .line-item
    // font-size: 18px
    border-bottom: 2px solid #f5f5f5
    padding: 8px 0
    position: relative
    span
      position: absolute
      right: 0
    &.total
      border-bottom: none
      font-weight: bold
  .book
    background: #09ad7e
    margin: 16px 0 24px
    color: #fff
    &:disabled
      background: #aaa
      opacity: 0.6
  .terms
    font-size: 13px
    position: relative
.assurances
 margin-top: 24px
 padding-top: 32px
 border-top: 1px solid #e8e8e8
 color: #999
 font-size: 13px
</style>