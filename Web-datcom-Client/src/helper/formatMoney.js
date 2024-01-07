const money = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const formatPrice = (price) => {
  return money.format(price);
};
