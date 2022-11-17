import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [
      {
        id: 1,
        name: "Product 1",
        subject: "Math",
        location: "London",
        price: 100,
        url: "https://simg.nicepng.com/png/small/137-1372954_calculator-free-icon-.png",

        cart: false,
        quantity: 5,
      },
      {
        id: 2,
        name: "Product 2",
        subject: "Math",
        location: "Oxford",
        price: 100,
        url: "https://simg.nicepng.com/png/small/137-1372954_calculator-free-icon-.png",
        cart: false,
        quantity: 5,
      },
      {
        id: 3,
        name: "Product 3",
        subject: "English",
        location: "London",
        price: 100,
        url: "https://media.istockphoto.com/vectors/feather-pen-icon-flat-vector-template-design-trendy-vector-id1220627789?k=20&m=1220627789&s=612x612&w=0&h=3J2sCIJLtRH-8Dr4OyFIV-bkcQa9ZGCtoOcHtW_gEh8=",
        cart: false,
        quantity: 5,
      },
      {
        id: 4,
        name: "Product 4",
        subject: "English",
        location: "York",
        price: 80,
        url: "https://media.istockphoto.com/vectors/feather-pen-icon-flat-vector-template-design-trendy-vector-id1220627789?k=20&m=1220627789&s=612x612&w=0&h=3J2sCIJLtRH-8Dr4OyFIV-bkcQa9ZGCtoOcHtW_gEh8=",
        cart: false,
        quantity: 5,
      },
      {
        id: 5,
        name: "Product 5",
        subject: "Music",
        location: "Bristol",
        price: 90,
        url:"https://icon-library.com/images/music-notes-icon/music-notes-icon-27.jpg",
        cart: false,
        quantity: 5,
      },
      {
        id: 6,
        name: "Product 6",
        subject: "Art",
        location: "Belfast",
        price: 60,
        url:"https://i.pinimg.com/564x/c0/5d/c3/c05dc3dd9ff493c6c53c756cc2263cff.jpg",
        cart: false,
        quantity: 5,
      },
      {
        id: 7,
        name: "Product 7",
        subject: "Art",
        location: "Canada",
        price: 60,
        url:"https://i.pinimg.com/564x/c0/5d/c3/c05dc3dd9ff493c6c53c756cc2263cff.jpg",
        cart: false,
        quantity: 5,
      },
      {
        id: 8,
        name: "Product 8",
        subject: "Music",
        location: "Dundee",
        price: 70,
        url:"https://icon-library.com/images/music-notes-icon/music-notes-icon-27.jpg",
        cart: false,
        quantity: 5,
      },
      {
        id: 9,
        name: "Product 9",
        subject: "Art",
        location: "Dundee",
        price: 50,
        url:"https://i.pinimg.com/564x/c0/5d/c3/c05dc3dd9ff493c6c53c756cc2263cff.jpg",
        cart: false,
        quantity: 5,
      },
      {
        id: 10,
        name: "Product 10",
        subject: "Math",
        location: "Canada",
        price: 110,
        url: "https://simg.nicepng.com/png/small/137-1372954_calculator-free-icon-.png",
        cart: false,
        quantity: 5,
      },
    ],
    cart:[],
  },
  mutations: {
    addProduct(state,product){
      state.cart.push(product)
      state.products.map((p)=>{
        if ( p.id == product.id) {
          p.cart= true
        }
      })
    },
    removeProduct(state,id){
      state.cart = state.cart.filter((p)=> p.id != id )
      state.products.map((p)=>{
        if ( p.id == id) {
          p.quantity = 5
          p.cart= false
        }
      })
    },
  },
  actions: {
    addProduct({commit},product){
      commit('addProduct',product)
    },
    removeProduct({commit},id){
      commit('removeProduct',id)
    },
  },
  getters:{
    getProducts: state => {
      return state.products
    },
    getCart: state => {
      return state.cart
    },
    getTotal: state => {
      let total = 0
      state.cart.map((p) => {
        total += p.price
      })
      return total
    },
  },
  modules: {
  }
})
