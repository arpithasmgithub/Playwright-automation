Feature: Ecommerce validations

  # The first example has two steps
  Scenario: Placing the Order
  Given a login to Ecommerce application with "arpitha@gmail.com" and "Linked@1995"
    When Add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory