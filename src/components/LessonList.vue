<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">
        <router-link
          to="/cart"
          custom
          v-slot="{ navigate }"
        >
          <button
            class="cart-back"
            @click="navigate"
            role="link"
            v-bind:disabled="cart >= 0"
          >
            Shopping Cart
          </button>
        </router-link>
      </div>
    </div>
  </div>
  <br/>
  <div class="table-padding">
     <h2>Search name:
      <input class="small-text" v-model="searchQuery" placeholder="Search by subject or location...">
    </h2>
  </div>

  <div id="app">
    <div class="row">
      <div class="col-lg-2">
        <table class="table-padding">
          <tr><h2>Sort by</h2></tr>
          <br/>

        </table>
      </div>
      <div class="col-lg-10">
        <div>
          <section class="lessons">
            <!-- Information stored in the object -->
            <div v-for="lesson in searchedProducts" :key="lesson.id" class="lesson">
              <div >
                <div class="row">
                  <div class="col-sm-8">
                    <div class="text-align-left">
                      <h3 class="bold">Subject: {{ lesson.subject }}</h3>
                      <h3 class="bold">Location: {{ lesson.location }}</h3>
                      <h3 class="bold">
                        Price: <span class="bold">&#163;</span>{{ lesson.price }}
                      </h3>
                      <h3 class="bold">Spaces: {{ lesson.quantity }}</h3>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <img :src="lesson.url" class="image-padding" width="130" height="130" />
                  </div>
                </div>
              </div>
              <div class="cart ">
                <!-- Button to add the lesson in the cart -->
                <button
                  v-on:click="addProduct(lesson)"
                  class="cart__button"
                >
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
    const searchedProducts = computed(() => {
      return store.getters.getProducts.filter((product) => {
          return (
            product.subject.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 ||
          product.location.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
          );

      });
    });

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
    function checkCart() {
      console.log(this.total)


    }

    function sortSubject(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.subject > b.subject ? 1 : -1)
      else
        this.products.sort((a,b) => a.subject < b.subject ? 1 : -1)
    }
    function sortLocation(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.location > b.location ? 1 : -1)
      else
        this.products.sort((a,b) => a.location < b.location ? 1 : -1)
    }
    function sortPrice(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.price > b.price ? 1 : -1)
      else
        this.products.sort((a,b) => a.price < b.price ? 1 : -1)
    }
    function sortAvaiabiity(value){
      if (value == 'Ascending' )
        this.products.sort((a,b) => a.quantity > b.quantity ? 1 : -1)
      else
        this.products.sort((a,b) => a.quantity < b.quantity ? 1 : -1)
    }
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
      checkCart,
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
.table-padding{
  margin-top: 30px;
  margin-left: 40px ;
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
