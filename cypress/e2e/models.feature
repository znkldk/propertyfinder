Feature: dsfs

Scenario: title
 Given Go to website
  When Select property type as "Villa"
  And Click Search Button
  And Set The Price max as "30,000"
  And Click Find Button
  Then adim3