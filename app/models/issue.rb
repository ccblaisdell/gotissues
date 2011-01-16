class Issue < ActiveRecord::Base
  validates :name,  :presence => true
  validates :status,  :presence => true
  
  belongs_to :user
  belongs_to :project
  belongs_to :assignee, :class_name => "User"
  has_many :comments
  has_many :images, :as => :imageable
  acts_as_taggable
  
  attr_accessible :name, :description, :status, :number, :priority
  
  STATES = ['open', 'resolved', 'closed', 'reopened']
  PRIORITIES = ['low', 'normal', 'high', 'critical']
  
  scope :by_project, lambda { |c| c.nil? ? criteria : where(:project_id => c) }
  scope :by_number, lambda { |number| number.nil? ? criteria : where(:number => number) }
  scope :active, :conditions => ["status != ?", "closed"]
  
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
  
  def created_at_json
    self.created_at.to_s
  end
  def updated_at_json
    self.updated_at.to_s
  end
  
  def to_json
    super(
      :methods => [:priority_name, :created_at_json, :updated_at_json],
      :include => {
        :user => {:only => [:id, :name]},
        :assignee => {:only => [:id, :name]},
        :comments => {:only => [:id]}
      }
    )
  end
end
