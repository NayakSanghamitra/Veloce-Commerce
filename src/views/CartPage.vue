<template>
  <v-container class="py-8">
    <h1 class="text-h4 font-weight-black mb-6">Shopping Cart</h1>

    <v-row v-if="cartItems.length > 0">
      <!-- Items List -->
      <v-col cols="12" lg="8">
        <v-card variant="outlined" rounded="xl" class="pa-2">
          <v-list lines="two" bg-color="transparent">
            <template v-for="(item, index) in cartItems" :key="item.id">
              <v-list-item class="py-4">
                <template v-slot:prepend>
                  <v-avatar size="80" rounded="lg" color="surface-variant" class="mr-4">
                    <v-img :src="item.image" contain></v-img>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-bold text-subtitle-1 mb-1">
                  {{ item.title }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption text-capitalize mb-2">
                  Category: {{ item.category }}
                </v-list-item-subtitle>

                <div class="text-h6 font-weight-black text-primary">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                  <span class="text-caption text-medium-emphasis">(${{ item.price }} each)</span>
                </div>

                <template v-slot:append>
                  <div class="d-flex align-center ga-2">
                    <!-- Quantity Stepper -->
                    <v-btn
                      icon="mdi-minus"
                      size="x-small"
                      variant="outlined"
                      @click="decreaseQty(item)"
                    ></v-btn>
                    
                    <span class="font-weight-bold px-2">{{ item.quantity }}</span>

                    <v-btn
                      icon="mdi-plus"
                      size="x-small"
                      variant="outlined"
                      @click="increaseQty(item)"
                    ></v-btn>

                    <!-- Remove Item -->
                    <v-btn
                      icon="mdi-delete-outline"
                      size="small"
                      color="error"
                      variant="text"
                      class="ml-2"
                      @click="removeItem(item.id)"
                    ></v-btn>
                  </div>
                </template>
              </v-list-item>

              <v-divider v-if="index < cartItems.length - 1" :key="`div-${item.id}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <!-- Summary Sidebar -->
      <v-col cols="12" lg="4">
        <v-card elevation="3" rounded="xl" class="pa-6">
          <h2 class="text-h6 font-weight-bold mb-4">Order Summary</h2>

          <div class="d-flex justify-space-between mb-3 text-body-2">
            <span class="text-medium-emphasis">Subtotal</span>
            <span class="font-weight-bold">${{ subtotal.toFixed(2) }}</span>
          </div>

          <div class="d-flex justify-space-between mb-3 text-body-2">
            <span class="text-medium-emphasis">Estimated Shipping</span>
            <span class="text-success font-weight-bold">FREE</span>
          </div>

          <div class="d-flex justify-space-between mb-3 text-body-2">
            <span class="text-medium-emphasis">Estimated Tax (8%)</span>
            <span class="font-weight-bold">${{ tax.toFixed(2) }}</span>
          </div>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-space-between mb-6 text-h5 font-weight-black">
            <span>Total</span>
            <span class="text-primary">${{ grandTotal.toFixed(2) }}</span>
          </div>

          <v-btn
            color="primary"
            size="x-large"
            block
            rounded="lg"
            elevation="2"
            prepend-icon="mdi-lock-outline"
            @click="checkoutDialog = true"
          >
            Proceed to Checkout
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Cart Empty View -->
    <v-row v-else justify="center" class="py-12">
      <v-col cols="12" md="6" class="text-center">
        <v-icon icon="mdi-cart-off" size="80" color="medium-emphasis" class="mb-4"></v-icon>
        <h2 class="text-h5 font-weight-bold mb-2">Your Cart is Empty</h2>
        <p class="text-body-1 text-medium-emphasis mb-6">Looks like you haven't added any products yet.</p>
        <v-btn to="/" color="primary" size="large" rounded="lg" prepend-icon="mdi-arrow-left">
          Continue Shopping
        </v-btn>
      </v-col>
    </v-row>

    <!-- Mock Checkout Dialog -->
    <v-dialog v-model="checkoutDialog" max-width="500">
      <v-card rounded="xl" class="pa-6 text-center">
        <v-icon icon="mdi-check-circle" color="success" size="64" class="mb-4"></v-icon>
        <h3 class="text-h5 font-weight-bold mb-2">Order Confirmed!</h3>
        <p class="text-body-2 text-medium-emphasis mb-6">
          Thank you for exploring Veloce Commerce. Your mock order has been placed successfully.
        </p>
        <v-btn color="primary" block rounded="lg" @click="clearAndHome">Back to Store</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const checkoutDialog = ref(false)

const cartItems = computed(() => store.state.cart || [])

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const tax = computed(() => subtotal.value * 0.08)
const grandTotal = computed(() => subtotal.value + tax.value)

const increaseQty = (item) => {
  store.dispatch('addToCart', item)
}

const decreaseQty = (item) => {
  store.dispatch('decreaseCartItem', item.id)
}

const removeItem = (id) => {
  store.dispatch('removeFromCart', id)
}

const clearAndHome = () => {
  checkoutDialog.value = false
  store.dispatch('clearCart')
  router.push('/')
}
</script>
