<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <!-- Shopping cart button (only enabled when there is an item in the cart) -->
        <router-link to="/cart" custom v-slot="{ navigate }">
          <button class="cart-back" v-on:click="navigate" role="link" v-bind:disabled="cart >= 0">
            Shopping Cart
          </button>
        </router-link>
      </div>
    </div>
  </div>
  <br/>
  <div class="table-padding">
     <!-- Search field to search lesson by subject name or location -->
     <h2>Search:<input class="small-text" v-model="searchQuery" placeholder=" Search by subject or location..."></h2>
  </div>
  <div id="app">
    <div class="row">
      <div class="col-lg-2">
        <table class="table-padding">
          <tr><h2>Sort by</h2></tr>
          <br/>
          <!-- Sorting according to subject, location, price or availability (Ascending or Descending) -->
          <tr><label><input type="radio" v-on:click="sortSubject(order)" value="subject" v-model="course"> Subject</label></tr>
          <tr><label><input type="radio" v-on:click="sortLocation(order)" value="location" v-model="course"> Location</label></tr>
          <tr><label><input type="radio" v-on:click="sortPrice(order)" value="Price" v-model="course"> Price</label></tr>
          <tr><label><input type="radio" v-on:click="sortAvaiabiity(order)" value="Availability" v-model="course"> Availability</label></tr>
          <br/><br/>
          <tr><label><input type="radio" v-on:click="OrderAscending(course)" value="Ascending" v-model="order"> Ascending</label></tr>
          <tr><label><input type="radio" v-on:click="OrderDescending(course)" value="Descending" v-model="order"> Descending</label></tr>
        </table>
      </div>
      <div class="col-lg-10">
        <div>
          <section class="lessons">
            <!-- Show a the lessons stored in the searchedProducts -->
            <div v-for="lesson in searchedProducts" :key="lesson.id" class="lesson">
              <div >
                <div class="row">
                  <div class="col-sm-8">
                    <div class="text-align-left">
                      <h4 class="bold">Subject: {{ lesson.subject }}</h4>
                      <h4 class="bold">Location: {{ lesson.location }}</h4>
                      <h4 class="bold">Price: <span class="bold">&#163;</span>{{ lesson.price }}</h4>
                      <h4 class="bold">Spaces: {{ lesson.quantity }}</h4>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <img :src="lesson.url" class="image-padding" width="110" height="110" />
                  </div>
                </div>
              </div>
              <div class="cart ">
                <!-- Button to add the lesson in the cart -->
                <button v-on:click="addProduct(lesson)" class="cart__button">
                  Add to cart
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "LessonList",
  data() {
    return{
      course: 'subject',
      order: 'Ascending',
    }
  },

  setup() {
    const store = useStore();
    const searchQuery = ref("");

    // Function to search the lesson by name or location
    const searchedProducts = computed(() => {
      return store.getters.getProducts.filter((product) => {
          return (
            product.subject.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 ||
          product.location.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
          );

      });
    });

    // Function to Add the lesson in the store object
    function addProduct(p) {
      let product = { ...p };
      for (let i = 0; i < this.products.length; i++) {
        // Check if the current lesson matches the lesson id
        if (this.products[i].id === p.id) {
          // Loop until the space is zero
          if (this.products[i].quantity !== 0) {
            // Decrement the space counter and add the lesson
              this.products[i].quantity--;
              store.dispatch("addProduct", product);
          }
          break;
        }
      }
    }

    // Function to sort by subject name
    function sortSubject(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.subject > b.subject ? 1 : -1)
      else
        this.products.sort((a,b) => a.subject < b.subject ? 1 : -1)
    }

    // Function to sort by location
    function sortLocation(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.location > b.location ? 1 : -1)
      else
        this.products.sort((a,b) => a.location < b.location ? 1 : -1)
    }

    // Function to sort by price
    function sortPrice(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.price > b.price ? 1 : -1)
      else
        this.products.sort((a,b) => a.price < b.price ? 1 : -1)
    }

    // Function to sort by subject space
    function sortAvaiabiity(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.quantity > b.quantity ? 1 : -1)
      else
        this.products.sort((a,b) => a.quantity < b.quantity ? 1 : -1)
    }

    // Function to order in ascending
    function OrderAscending(value){
      if (value == 'subject')
        this.sortSubject('Ascending')
      else if (value == 'location')
        this.sortLocation('Ascending')
      else if (value == 'price')
        this.sortPrice('Ascending')
      else
        this.sortAvaiabiity('Ascending')
    }

    // Function to order in descending
    function OrderDescending(value){
      if (value == 'subject')
        this.sortSubject('Descending')
      else if (value == 'location')
        this.sortLocation('Descending')
      else if (value == 'price')
        this.sortPrice('Descending')
      else
        this.sortAvaiabiity('Descending')
    }

    return {
      addProduct,
      sortSubject,
      sortLocation,
      sortPrice,
      sortAvaiabiity,
      OrderAscending,
      OrderDescending,
      searchedProducts,
      searchQuery,
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
.table-padding{
  margin-top: 30px;
  margin-left: 40px ;
  font-size: 20px ;
}
.cart-back {
  margin-top: 10px;
  text-decoration: underline;
  padding: 1px 6px 1px 6px;
  text-align: center;
  color: rgb(29, 102, 102);
  font-size: 30px;
}
.small-text{
  font-size: 25px;
}
</style>
