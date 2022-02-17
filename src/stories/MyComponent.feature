  Scenario: Loading a user's name
    Given the component renders
    Then I can see a loading state while the data is being retrieved
    When the data is loaded
    Then a message and a name is shown