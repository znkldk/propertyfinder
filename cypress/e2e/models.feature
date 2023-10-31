Feature: dsfs

  Scenario: Scenario 1
    Given Go to website
    When Select property type as "Villa"
    And Click Search Button
    And Set The Price max as "300,000"
    And Click Find Button

  Scenario: Scenario 2
    Given Go to website
    When Click Show commercial properties only btn
    And Click Search Button
    And Dropdown property type "Office Space"
    And Click Find Button

  Scenario: Scenario 3
    Given Go to website
    And SearchBox Enter "Bahrain Bay"
    And Click Search Button
    And Open first result
    Then Check if there is a available text
