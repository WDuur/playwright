Feature: Main menu interaction

Scenario: The Main menu is visible
    Given the user visits the homepage
    Then in the menu there is a ShareValue logo
    And I should see the following submenu items:
      | Wat we doen        |
      | Kennisbank         |
      | Word onze collega  |
      | Contact            |


 Scenario: The "Wat we doen" menu shows the correct submenu items with correct links
    Given the user visits the homepage
    When I hover over the "Wat we doen" menu item
    Then I should see the following submenu items under "Wat we doen":
      | text              | url                          |
      | Onze aanpak       | /onze-aanpak                 |
      | Microsoft Azure   | /wat-we-doen/azure           |
      | Microsoft 365     | /wat-we-doen/microsoft-365   |
      | Power Platform    | /wat-we-doen/power-platform  |
      | Development       | /wat-we-doen/development     |

Scenario: The "Kennisbank" menu shows the correct submenu items with correct links
    Given the user visits the homepage
    When I hover over the "Kennisbank" menu item
    Then I should see the following submenu items under "Kennisbank":
      | text              | url                          |
      | Alle              | /kennisbank                  |
      | Nieuws            | /kennisbank/nieuws           |
      | Blogs             | /kennisbank/blogs            |
      | Evenementen       | /kennisbank/events           |
      | Klantcases        | /kennisbank/klantcases       |