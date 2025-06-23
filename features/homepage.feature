Feature: Playwright Home Page

  Scenario: Check title
    Given I am on website home page
    When I click link "Wat we doen"
    Then I see in title "Wat we doen – Microsoft expertise op maat | ShareValue"
