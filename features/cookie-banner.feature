Feature: Cookie banner interaction
  Scenario: Clear all cookies
    Given the user visits the homepage
    When all cookies are cleared
    Then the cookie banner should be "visible"
 
  Scenario: User accepts cookies
    Given the user visits the homepage
    Then the cookie banner should be "visible" 
    When the user clicks the "Accepteren" button
    Then the cookie banner should be "not visible" 
    And the "cookieConsent" cookie should be set to "true"

  Scenario: User dont accepts cookies
    Given the user visits the homepage
    Then the cookie banner should be "visible" 
    When the user clicks the "Weigeren" button
    Then the cookie banner should be "not visible" 
    And the "cookieConsent" cookie should be set to "false"

Scenario: User wants to manage cookies
    Given the user visits the homepage
    And the cookie banner should be "visible"
    When the user clicks the "Cookies beheren" link
 
    Then the cookie settings should be shown
    When the user clicks the checkbox to accept the cookies
    And the user clicks the "Bevestigen" button
    Then the "cookieConsent" cookie should be set to "true"