Feature: Playwright Homepage

  # @fast
  # Scenario: Check homepage hero slider
  #   When I am on website homepage
  #   Then I see a slider on the page as heroImage
  # @fast
  # Scenario: Check that the homepage hero has 2 slides
  #   When I am on website homepage
  #   Then the swiper should have exactly 2 slides
  # Scenario: Check home page hero slider navigation
  #   When I click on every bullet at the hero slider
  #   Then the corresponding slide is active
  # @fast
  # Scenario: On the homepage there is a introduction text
  #   When I am on website homepage
  #   Then I should see a header with the text "ShareValue, de standaard voorbij"
  #   And I should see a paragraph containing the description about the header
  # Scenario: On the homepage the ShareValue expertises are visable
  #   When I am on website homepage
  #   Then I see the "expertise" segment on the homepage
  #   And The "expertise" segment has "Onze expertises" as title
  #   And The "expertise" segment has "expertises" as label
  #   Then there is one expertise block for "Azure"
  #   And there is one expertise block for "Microsoft 365"
  #   And there is one expertise block for "Power Platform"
  #   And there is one expertise block for "Development"
  # Scenario: On the homepage the is a explanation about ShareValue partners
  #   When I am on website homepage
  #   Then I see the "partner" segment on the homepage
  #   And The "partner" segment has "Een betrouwbare partner" as title
  #   And I should see a paragraph containing the description about the "partner" segment
  #   And This "partner" segment has "2" partner logos
  # Scenario: On the homepage there is a banner about us
  #   When I am on website homepage
  #   Then I see the "banner" segment on the homepage
  #   And The "banner" segment has "ShareValue - De standaard voorbij" as title
  #   And On the "banner" is a cta with a link to "/over-ons"
  # Scenario: On the homepage there is a segment how ShareValue works
  #   When I am on website homepage
  #   Then I see the "work" segment on the homepage
  #   And The "work" segment has "Zo werkt ShareValue" as title
  #   And there are "6" blocks to explain how we "work" with a image, title and paragraph
  # Scenario: On the homepage there is an overview with all clients
  #   When I am on website homepage
  #   Then I see the "clients" segment on the homepage
  #   And The "clients" segment has "Onze opdrachtgevers" as title
  #   And I should see a paragraph containing the description about the "clients" segment
  #   And there are "9" blocks to show "clients" with a image
  #   And there is a block for "roveg" with a url to the customerscase page
  #   And there is a block for "QSN" with a url to the customerscase page
  #   And there is a block for "Provincie Utrecht" with a url to the customerscase page
  #   And there is a block for "Stork" with a url to the customerscase page
  #   And there is a block for "Rovict" with a url to the customerscase page
  #   And there is a block for "NTI" with a url to the customerscase page
  Scenario: On the homepage there are rotating quotes
    When I am on website homepage
    Then the "quotes" should have exactly "5" slides with quotes
    When I click on every bullet at the "quotes" slider


# Then the corresponding slide is active