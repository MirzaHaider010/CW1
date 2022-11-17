
<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <!-- Shopping cart button to go back to lesson list page -->
        <button class="cart-back" v-on:click="$router.back()">Shopping Cart</button>
      </div>
    </div>
  </div>
</div>
  <br/>
  <h1 class="make-center">SHOPPING CART</h1>
  <br/><br/>
  <!-- Check if the cart is empty -->
  <h1 class="make-center" v-if="cart<=0">The cart is empty</h1>
  <br/><br/>
  <section class="lessons">
     <!-- Show all the products in the cart -->
      <div v-for="lesson in cart" :key="lesson.id" class="lesson">
        <div class="container">
          <div class="row">
            <div class="col-sm-8">
              <div class="text-align-left">
                <h4 class="bold">Subject: {{ lesson.subject }}</h4>
                <h4 class="bold">Location: {{ lesson.location }}</h4>
                <h4 class="bold">Price: <span class="bold">&#163;</span>{{ lesson.price }}</h4>
              </div>
            </div>
            <div class="col-sm-4">
              <img :src="lesson.url" class="image-padding" width="110" height="110" />
            </div>
          </div>
        </div>
        <div class="cart ">
          <!-- Button to remove lesson from cart -->
          <button
            v-on:click="removeProduct(lesson.id)"
            class="cart__button"
          >
            Remove
          </button>
        </div>
      </div>
    </section>
  <br/>
  <h1 class="make-center">CHECKOUT</h1>
  <br/>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <!-- Show total price of the products in the cart -->
        <h4>Total price : {{ total }}</h4>
      </div>
    </div>
  </div>
  <br/>
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <p>Name: <input v-model="name" /></p>
      </div>
      <div class="col-sm-4">
        <p>Phone:<input v-model="phone"  /></p>
      </div>
      <div class="col-sm-4">
        <button v-on:click="checkout(name, phone)" class="cart__button">
            Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed } from "vue";
  import { useStore } from "vuex";

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Cart",
    data() {
      return{
        phone: 0,
        name: '',
      }
    },

    setup() {
      const store = useStore();

      // Function to remove lesson from cart
      function removeProduct(id) {
        store.dispatch("removeProduct", id);
      }

      // Function to checkout the cart
      function checkout(name, phone) {

        // Regex pattern for phone number
        var phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

        // Regex pattern for name
        var namePattern = /^[A-Za-z ]+$/

        // Check if the cart is empty
        if(this.total == 0){
          alert("The cart is empty")
        }

        // Check if name and phone number is entered
        else if(!(name && phone)){
          alert("Please provide a valid name and phone number")
        }

        // Validate the name with regex name pattern
        else if(!(namePattern.test(name))){
          alert("Please provide a valid format of name e.g spike")
        }

        // Validate the phone with regex phone pattern
        else if(!(phonePattern.test(phone))){
          alert("Please provide a valid format of phone number e.g 1234567890")
        }
        else{
          alert("The order is succesfully confirmed")
        }

      }

      return {
        removeProduct,
        checkout,
        cart: computed(() => store.getters.getCart),
        products: computed(() => store.getters.getProducts),
        total: computed(() => store.getters.getTotal),
      };
    },
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
* {
  box-sizing: border-box;
  font-weight: normal;
  margin: 0;
  padding: 0;
}
html {
  font-size: 20px;
}
.lessons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.lesson {
  border: 2px solid rgb(84, 130, 156);
  border-radius: 40px;
  margin: 2rem;
  padding: 1rem;
  height: 235px;
}
.cart {
  margin-top: 1rem;
  text-align: center;

}
.text-align-left {
  text-align: left;
  padding-top: 10px;
  line-height: 1.2;
}
.bold {
  font-weight: bold;
}
.cart__button {
  font-size: 23px;
  padding: 6px 30px 6px 30px;
  background-color: #547dd4;
  color: white;
  font-weight: bold;
  border: 2px solid rgb(114, 114, 114);
}
.cart__button:hover {
  background-color: #3661bd;
}
.image-padding{
  padding-right: 10px;
  padding-top: 10px;
}
.make-center{
  text-align: center;
}
.cart-back {
  margin-top: 10px;
  text-decoration: underline;
  padding: 1px 6px 1px 6px;
  text-align: center;
  color: rgb(29, 102, 102);
  font-size: 30px;
}
.cart-back:hover{
  color: rgb(12, 19, 19);
}
</style>
