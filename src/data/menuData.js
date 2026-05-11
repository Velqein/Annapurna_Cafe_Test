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
      { name: 'Veg Hakka Noodles',      price: 149, type: 'noodles', tag: 'BEST SELLER' },
      { name: 'Paneer Chilli Noodles',  price: 179, type: 'noodles', tag: "CHEF'S PICK"  },
      { name: 'Schezwan Noodles',        price: 169, type: 'noodles', tag: 'SPICY'       },
      { name: 'Triple Schezwan',         price: 219, type: 'noodles', tag: 'EXTRA HOT'   },
      { name: 'Garlic Butter Noodles',  price: 189, type: 'noodles', tag: 'NEW'          },
      { name: 'Chicken Hakka Noodles',  price: 209, type: 'noodles', tag: 'NON-VEG'     },
    ],
  },
  rice: {
    title: 'RICE & PULAW',
    items: [
      { name: 'Veg Fried Rice',     price: 149, type: 'rice', tag: 'CLASSIC'     },
      { name: 'Paneer Fried Rice',  price: 179, type: 'rice', tag: 'POPULAR'     },
      { name: 'Schezwan Fried Rice',price: 169, type: 'rice', tag: 'SPICY'       },
      { name: 'Burnt Garlic Rice',  price: 189, type: 'rice', tag: "CHEF'S PICK" },
    ],
  },
  momos: {
    title: 'MOMOS',
    items: [
      { name: 'Steamed Veg Momos', price: 129, type: 'momo', tag: 'LIGHT'    },
      { name: 'Fried Veg Momos',   price: 149, type: 'momo', tag: 'CRISPY'   },
      { name: 'Paneer Momos',      price: 169, type: 'momo', tag: 'POPULAR'  },
      { name: 'Tandoori Momos',    price: 199, type: 'momo', tag: 'SMOKY'    },
    ],
  },
  sides: {
    title: 'CHINESE SIDES',
    items: [
      { name: 'Chilli Paneer',        price: 229, type: 'side', tag: 'BESTSELLER' },
      { name: 'Honey Chilli Potato',  price: 189, type: 'side', tag: 'CROWD FAV'  },
      { name: 'Veg Spring Rolls',     price: 159, type: 'side', tag: 'CRISPY'     },
    ],
  },
}
