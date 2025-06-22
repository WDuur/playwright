Feature: Cookie banner interaction
  Scenario: Clear all cookies
    Given the user visits the homepage
    When all cookies are cleared
    Then the cookie banner should be visible
    
 
  Scenario: User accepts cookies
    Given the user visits the homepage
    Then the cookie banner should be visible
    When the user clicks the "Accepteren" button
    Then the cookie banner should disappear
    And the "cookieConsent" cookie should be set to "true"