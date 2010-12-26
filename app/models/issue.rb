class Issue < ActiveRecord::Base
  validates :name,  :presence => true
  validates :status,  :presence => true
  
  belongs_to :user
  
  STATES = ['open', 'resolved', 'closed', 'reopened']
  
  def self.states
    STATES
  end
  
  def cycle_status
    status_index = STATES.index(status)
    status_index ||= 1
    
    next_status = status_index + 1 >= STATES.length ? 1 : status_index + 1
    
    status = STATES[next_status]
    
    # next_status = Issue.states.index(@issue.status) + 1 if Issue.states.index(@issue.status)
    # next_status = 1 if next_status > Issue.states.length
    # @issue.status = Issue.states[next_status]
  end
end
