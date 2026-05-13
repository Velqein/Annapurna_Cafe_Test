export const categories = [
  { id: 'noodles', label: 'Noodles' },
  { id: 'rice',    label: 'Rice & Pulaw' },
  { id: 'momos',   label: 'Momos' },
  { id: 'sides',   label: 'Chinese Sides' },
]

export const menuData = {
  noodles: {
    title: 'NOODLES',
    items: [
      { name: 'Veg Hakka Noodles',     price: 149, type: 'noodles', tag: 'BEST SELLER', imgKey: 'Veg_Hakka_noddles'     },
      { name: 'Paneer Chilli Noodles', price: 179, type: 'noodles', tag: "CHEF'S PICK",  imgKey: 'Paneer_Chiilli_Rice'  },
      { name: 'Schezwan Noodles',      price: 169, type: 'noodles', tag: 'SPICY',        imgKey: 'Schezwan_Noddlles'    },
      { name: 'Triple Schezwan',       price: 219, type: 'noodles', tag: 'EXTRA HOT',    imgKey: 'Triple_Scezwan'       },
      { name: 'Garlic Butter Noodles', price: 189, type: 'noodles', tag: 'NEW',          imgKey: 'Garlic_Butter_noodles'},
      { name: 'Chicken Hakka Noodles', price: 209, type: 'noodles', tag: 'NON-VEG',      imgKey: 'Chiken_Hakka_Noddles' },
    ],
  },
  rice: {
    title: 'RICE & PULAW',
    items: [
      { name: 'Veg Fried Rice',      price: 149, type: 'rice', tag: 'CLASSIC',      imgKey: 'Veg_Fried_Rice'      },
      { name: 'Paneer Fried Rice',   price: 179, type: 'rice', tag: 'POPULAR',      imgKey: 'Paneer_Fried_Rice'   },
      { name: 'Schezwan Fried Rice', price: 169, type: 'rice', tag: 'SPICY',        imgKey: 'Schezwan_Fried_Rice' },
      { name: 'Burnt Garlic Rice',   price: 189, type: 'rice', tag: "CHEF'S PICK",  imgKey: 'Burnt_Garlic_Rice'   },
    ],
  },
  momos: {
    title: 'MOMOS',
    items: [
      { name: 'Steamed Veg Momos', price: 129, type: 'momo', tag: 'LIGHT',   imgKey: 'Steamed_Veg_Momos' },
      { name: 'Fried Veg Momos',   price: 149, type: 'momo', tag: 'CRISPY',  imgKey: 'Veg_Fried_Momos'   },
      { name: 'Paneer Momos',      price: 169, type: 'momo', tag: 'POPULAR', imgKey: 'Paneer_Momos'       },
      { name: 'Tandoori Momos',    price: 199, type: 'momo', tag: 'SMOKY',   imgKey: 'Tanorri_Moms'       },
    ],
  },
  sides: {
    title: 'CHINESE SIDES',
    items: [
      { name: 'Chilli Paneer',       price: 229, type: 'side', tag: 'BESTSELLER', imgKey: 'Chillie_Paneer'      },
      { name: 'Honey Chilli Potato', price: 189, type: 'side', tag: 'CROWD FAV',  imgKey: 'Honey_Chilii_Potato' },
      { name: 'Veg Spring Rolls',    price: 159, type: 'side', tag: 'CRISPY',     imgKey: 'Veg_Spring_roll'     },
    ],
  },
}
