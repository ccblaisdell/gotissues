class Issue < ActiveRecord::Base
  validates :name,  :presence => true
  validates :status,  :presence => true
  
  belongs_to :user
  
  STATES = ['opened', 'closed', 'reopened']
  
  def self.states
    STATES
  end
end
