class Issue < ActiveRecord::Base
  validates :name,  :presence => true
  validates :status,  :presence => true
  
  belongs_to :user
  belongs_to :project
  belongs_to :assignee, :class_name => "User"
  has_many :comments
  has_many :images, :as => :imageable
  
  STATES = ['open', 'resolved', 'closed', 'reopened']
  PRIORITIES = ['low', 'normal', 'high', 'critical']
  
  scope :by_project, lambda { |c| c.nil? ? criteria : where(:project_id => c) }
  
  def self.states
    STATES
  end
  
  def self.priorities
    PRIORITIES
  end
  
  def priority_name
    PRIORITIES[priority]
  end
  
  def cycle_status
    status_index = STATES.index(status)
    status_index ||= 1
    
    next_status = status_index + 1 >= STATES.length ? 1 : status_index + 1
    
    status = STATES[next_status]
  end
end
