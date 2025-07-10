Feature: Playwright Home Page

  Scenario: Check home page hero slider
    When the user visits the homepage
    Then I see see a slider on the page as heroImage

  Scenario: Check home page hero has 2 slides
    Then the swiper container should have exactly 2 slides


# Scenario: Check home page hero  slider
#   When I press on the slider last bullet
#   Then i should see "2" slides are "Active" on the homepage