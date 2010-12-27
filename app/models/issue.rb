class Issue < ActiveRecord::Base
  validates :name,  :presence => true
  validates :status,  :presence => true
  
  attr_accessible :assignee
  
  belongs_to :user
  belongs_to :project
  belongs_to :assignee, :class_name => "User"
  
  STATES = ['open', 'resolved', 'closed', 'reopened']
  
  def self.states
    STATES
  end
  
  def cycle_status
    status_index = STATES.index(status)
    status_index ||= 1
    
    next_status = status_index + 1 >= STATES.length ? 1 : status_index + 1
    
    status = STATES[next_status]
  end
end
