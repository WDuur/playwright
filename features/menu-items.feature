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

Scenario: The "Word onze collega" menu shows the correct submenu items with correct links
    Given the user visits the homepage
    When I hover over the "Word onze collega" menu item
    Then I should see the following submenu items under "Word onze collega":
      | text                      | url                                       |
      | Vacatures                 | /word-onze-collega/vacatures              |
      | Memberships               | /word-onze-collega/memberships            |
      # | Collega's aan het woord   | /word-onze-collega/collegas-aan-het-woord |
      | Ontmoet onze experts      | /word-onze-collega/ontmoet-onze-experts   |
      | Stage lopen               | /word-onze-collega/stagelopen             | 

Scenario: The "Contact" menu shows the correct submenu items with correct links
    Given the user visits the homepage
    When I hover over the "Contact" menu item
    Then I should see the following submenu items under "Contact":
      | text                 | url                   |
      | Zakenvriend van KWF  | /zakenvriend-van-kwf  |

Scenario: User clicks on the menu button to show the desktop menu
    Given the user visits the homepage
    When the user clicks on the desktop menu button
    Then the desktop menu content should be visible
    Then the user clicks on the close button in the desktop menu
    Then the desktop menu content should not be visible

Scenario: The "Wat we doen " menu in desktop menu shows the correct submenu items with correct links
    Given the user visits the homepage
    When the user clicks on the desktop menu button
    Then I should see the following desktop menu items:
      | text                                | url                                                        |
      | Wat we doen                         | /wat-we-doen                                              |
      | Onze aanpak                         | /onze-aanpak                                              |
      | Microsoft Azure                     | /wat-we-doen/azure                                        |
      | Microsoft 365                       | /wat-we-doen/microsoft-365                                |
      | Power Platform                      | /wat-we-doen/power-platform                                |
      | Development                         | /wat-we-doen/development                                  |
      | Word onze collega                   | /word-onze-collega                                        |
      | Memberships                         | /word-onze-collega/memberships                            |
      | Collega’s aan het woord              | /word-onze-collega/collegas-aan-het-woord                 |
      | Ontmoet onze experts                | /word-onze-collega/ontmoet-onze-experts                   |
      | Stage lopen                         | /word-onze-collega/stagelopen                              |
      | Kennisbank                          | /kennisbank                                               |
      | Alle                                | /kennisbank                                               |
      | Nieuws                              | /kennisbank/nieuws                                        |
      | Blogs                               | /kennisbank/blogs                                         |
      | Evenementen                         | /kennisbank/events                                        |
      | Klantcases                          | /kennisbank/klantcases                                    |
      | Onze aanpak                         | /onze-aanpak                                              |
      | De Microsoft 365 Copilot-straat     | /onze-aanpak/microsoft-365-copilot-straat                 |
      | Adoptiestraat                       | /onze-aanpak/adoptiestraat                                |
      | Migratiestraat                      | /onze-aanpak/migratiestraat                               |
      | NIS2-Modules                        | /onze-aanpak/nis2-modules                                 |
      | Vacatures                           | /word-onze-collega/vacatures                              |
      | Azure                               | /word-onze-collega/azure#vacatures                        |
      | Microsoft 365                       | /word-onze-collega/microsoft-365#vacatures                |
      | Power Platform                      | /word-onze-collega/power-platform#vacatures               |
      | Development                         | /word-onze-collega/development#vacatures                  |
      | Contact                             | /contact                                                  |
      | Routebeschrijving                   | https://www.google.com/maps/place/Kampenringweg+45A,+2803+PE+Gouda/ |
      | Zakenvriend van KWF                 | /zakenvriend-van-kwf                                      |
    Then the user clicks on the close button in the desktop menu
    Then the desktop menu content should not be visible