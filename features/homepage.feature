Feature: Playwright Homepage

  @fast
  Scenario: Check homepage hero slider
    When I am on website homepage
    Then I see a slider on the page as heroImage

  @fast
  Scenario: Check that the homepage hero has 2 slides
    When I am on website homepage
    Then the swiper should have exactly 2 slides

  Scenario: Check home page hero slider navigation
    When I click on every bullet at the hero slider
    Then the corresponding slide is active

  @fast
  Scenario: On the homepage there is a introduction text
    When I am on website homepage
    Then I should see a header with the text "ShareValue, de standaard voorbij"
    And I should see a paragraph containing the description about the header
