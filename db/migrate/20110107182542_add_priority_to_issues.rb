class AddPriorityToIssues < ActiveRecord::Migration
  def self.up
    add_column :issues, :priority, :integer, :default => 1
  end

  def self.down
    remove_column :issues, :priority
  end
end
